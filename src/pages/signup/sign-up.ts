import {Component, ViewChild} from '@angular/core';

import {NavController, Slides, ToastController, Checkbox, App} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {Http} from "@angular/http";

declare var Stripe: any;

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService]
})

export class SignUpPage {

  @ViewChild('signupSlider') slider: Slides;
  @ViewChild('individual') individual: Checkbox;
  @ViewChild('business') business: Checkbox;

  private formPersonalInformation: FormGroup;
  private formLoginInformation: FormGroup;
  private formCreditCardInformation: FormGroup;

  private personalFieldsMissing: boolean;
  private loginFieldsMissing: boolean;
  private paymentFieldsMissing: boolean;

  private invalidZip: boolean;
  private invalidPassword: boolean;
  private invalidCvc: boolean;
  private invalidBillingZip: boolean;
  private showCreditCardError: boolean;
  private noAccountTypeSelected: boolean;
  private passwordsMatch: boolean;
  private creditCardRejected: boolean;

  private checkboxPro: string;
  private checkboxConsumer: string;
  private businessType: string;
  private fullName: string;
  private DOB: string;
  private addressLine1: string;
  private addressLine2: string;
  private state: string;
  private city: string;
  private zipCode: number;
  private country: string;
  private email: string;
  private password1: string;
  private password2: string;

  private accountInfo: any;
  private paymentInfo: any;

  constructor(public navCtrl: NavController, private authService: AuthService,
              public formBuilder: FormBuilder, private toastCtrl: ToastController,
              private app: App, private http: Http) {
    this.personalFieldsMissing = false;
    this.loginFieldsMissing = false;
    this.paymentFieldsMissing = false;
    this.invalidZip = false;
    this.noAccountTypeSelected = false;
    this.invalidBillingZip = false;
    this.invalidCvc = false;
    this.passwordsMatch = true;
    this.invalidPassword = false;
    this.showCreditCardError = false;
    this.country = "US";
    this.creditCardRejected = false;

    this.formLoginInformation = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(45), Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}')]), SignUpValidator.validateEmail],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      checkboxPro: [null],
      checkboxConsumer: [null]
    });

    this.formPersonalInformation = formBuilder.group({
      fullName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
      DOB: ['', Validators.compose([SignUpValidator.validateDOB, Validators.required])],
      addressLine1: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*'), Validators.required]), null],
      addressLine2: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null],
      businessType: ["individual"]
    });

    this.formCreditCardInformation = formBuilder.group({
      creditCardNumber: ['', Validators.compose([SignUpValidator.validateCreditCard, Validators.required])],
      cvc: ['', Validators.compose([Validators.pattern('[0-9]{3,4}'), Validators.required])],
      expirationDate: [new Date().toISOString(), Validators.required],
      billingZipCode: ['', Validators.required]
    });
  }

  checkIfAccountTypeSelected(): boolean {
    if (!this.formLoginInformation.value.checkboxPro && !this.formLoginInformation.value.checkboxConsumer) {
      this.noAccountTypeSelected = true;
      return false;
    }
    else {
      this.noAccountTypeSelected = false;
      return true;
    }
  }

  checkPasswords() {
    if (this.formLoginInformation.value.password2.length > 0) {
      if (this.formLoginInformation.value.password1 === this.formLoginInformation.value.password2) {
        this.passwordsMatch = true;
      }
      else {
        this.passwordsMatch = false;
      }
    }
    else {
      this.passwordsMatch = true;
    }

    if (this.formLoginInformation.value.password1.length > 0 && this.formLoginInformation.value.password1.length < 8) {
      this.invalidPassword = true;
    }
    else {
      this.invalidPassword = false;
    }
  }

  checkZip(form, zip) {
    if (form === this.formPersonalInformation) {
      if (zip != undefined && zip.length != 5) {
        this.invalidZip = true;
      }
      else {
        this.invalidZip = false;
      }
    }
    else {
      if (zip != undefined && zip.length != 5) {
        this.invalidBillingZip = true;
      }
      else {
        this.invalidBillingZip = false;
      }
    }
  }

  // hide the error message on focus and show it on blur if there is an error
  toggleCreditCardError(toggle) {
    if (!toggle && this.formCreditCardInformation.controls['creditCardNumber'].hasError('invalid credit card')) {
      this.showCreditCardError = true;
    }
    else {
      this.showCreditCardError = false;
    }
  }

  checkCvc() {
    if (this.formCreditCardInformation.value.cvc && (this.formCreditCardInformation.value.cvc.length < 3 ||
      this.formCreditCardInformation.value.cvc.length > 4)) {
      this.invalidCvc = true;
    }
    else {
      this.invalidCvc = false;
    }
  }

  clearBillingZipError() {
    this.invalidBillingZip = false;
  }

  formIsSubmittable(): boolean {
    console.log(this.invalidZip);
    console.log(this.invalidPassword);
    console.log(this.invalidCvc);
    console.log(this.invalidBillingZip);
    console.log(this.showCreditCardError);
    console.log(this.noAccountTypeSelected);
    console.log(this.passwordsMatch);

    if (this.formLoginInformation.valid && this.formPersonalInformation.valid && this.formCreditCardInformation.valid && !this.invalidZip && !this.invalidPassword && !this.invalidCvc && !this.invalidBillingZip && !this.showCreditCardError && !this.noAccountTypeSelected && this.passwordsMatch) {
      return true;
    }
    else {
      return false;
    }
  }

  signUp() {
    if (!this.formLoginInformation.valid) {
      this.loginFieldsMissing = true;
      this.slider.slideTo(0);
    }
    else if (!this.formPersonalInformation.valid) {
      this.personalFieldsMissing = true;
      this.slider.slideTo(1);
    }
    else if (!this.formCreditCardInformation.valid) {
      this.paymentFieldsMissing = true;
      this.slider.slideTo(2);
    }
    else if (this.formIsSubmittable()) {
      this.personalFieldsMissing = false;
      this.loginFieldsMissing = false;
      this.paymentFieldsMissing = false;
      this.invalidZip = false;
      this.invalidPassword = false;
      this.invalidCvc = false;
      this.invalidBillingZip = false;
      this.showCreditCardError = false;
      this.noAccountTypeSelected = false;
      this.passwordsMatch = false;
      this.creditCardRejected = false;

      this.accountInfo = {
        fullName: this.formPersonalInformation.value.fullName,
        dob: this.formPersonalInformation.value.DOB,
        address1: this.formPersonalInformation.value.addressLine1,
        address2: this.formPersonalInformation.value.addressLine2,
        state: this.formPersonalInformation.value.state,
        city: this.formPersonalInformation.value.city,
        zip: this.formPersonalInformation.value.zipCode,
        country: this.country,
        isPro: this.formLoginInformation.value.checkboxPro,
        isConsumer: this.formLoginInformation.value.checkboxConsumer,
        customer: this.formLoginInformation.value.checkboxConsumer,
        businessType: (this.individual && this.individual.checked) ? "individual" : "business",
        email: this.formLoginInformation.value.email,
        password: this.formLoginInformation.value.password1,
        paymentToken: ''
      };

      this.paymentInfo = {
        creditCardNumber: this.formCreditCardInformation.value.creditCardNumber,
        cvc: this.formCreditCardInformation.value.cvc,
        expDate: this.formCreditCardInformation.value.expirationDate,
        billingZip: this.formCreditCardInformation.value.billingZipCode
      };

      this.registerAccount();
    }
  }

  registerAccount() {
    Stripe.setPublishableKey('pk_test_FZHQgh9n93qAURvTBJXGwAF8');
    console.log(this);
    Stripe.card.createToken({
      number: this.paymentInfo.creditCardNumber,
      cvc: this.paymentInfo.cvc,
      exp_month: new Date(this.paymentInfo.expDate).getMonth() + 1,
      exp_year: new Date(this.paymentInfo.expDate).getFullYear(),
      address_zip: this.paymentInfo.billingZip
    }, this.stripeResponseHandler.bind(this));
  }

  stripeResponseHandler(status, response) {
    if (response.error) {
      this.presentToast("Could not validate card! Please try again.");
    }
    else {
      console.log("token retrieved successfully!");
      this.createAccount(response.id);
    }
  }

  createAccount(token) {
    this.accountInfo.paymentToken = token;
    let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOmZhbHNlLCJpc1BybyI6dHJ1ZX0.RNOEpb2AQ0gi70YeFSm5oOvuUIo8HUPCMV1UPY362xg"; // pro token
    let data = {
      user: this.accountInfo,
      jwt: mockToken
    };
    this.authService.storeToken(data);


    // this.accountInfo.paymentToken = token;
    // this.http.post('createUserAccount', this.accountInfo)
    //   .map(res => res.json())
    //   .subscribe(
    //     data => {
    //       localStorage.setItem('id_token', data.id_token);
    //       localStorage.setItem('current_user', data.userInfo);
    this.presentToast("Account created successfully!");
    this.navCtrl.push(TabsPage);
    //     },
    //     error => {
    //       console.log(error);
    //       this.authService.logout();
    //       this.app.getRootNav().setRoot(LoginPage);
    //     }
    //   );
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  slideNext(form) {
    if (form === this.formLoginInformation) {
      this.checkIfAccountTypeSelected();
      this.checkPasswords();
      if (!this.noAccountTypeSelected && !this.invalidPassword && this.passwordsMatch &&
        this.formLoginInformation.valid) {
        this.loginFieldsMissing = false;
        this.slider.slideNext();
      }
      else if (this.formLoginInformation.valid && this.formLoginInformation.value.password1 && this.formLoginInformation.value.password2) {
        this.loginFieldsMissing = false;
      }
      else {
        this.loginFieldsMissing = true;
      }
    }
    else if (form === this.formPersonalInformation && !this.formPersonalInformation.valid) {
      this.personalFieldsMissing = true;
    }
    else {
      this.personalFieldsMissing = false;
      this.slider.slideNext();
    }
  }

}
