import {Component, ViewChild} from '@angular/core';

import {NavController, Slides, ToastController, Checkbox, App} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";
import {AuthService} from "../../services/auth/auth.service";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

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

  constructor(public navCtrl: NavController, private authService: AuthService,
              public formBuilder: FormBuilder, private toastCtrl: ToastController,
              private app: App) {
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

  toggleCreditCardError(group: FormGroup) {
    // if (group.controls['creditCardNumber'].hasError('invalid credit card')) {
    //   this.showCreditCardError = true;
    // }
    // else {
    //   this.showCreditCardError = false;
    // }
    console.log(this.formCreditCardInformation.controls['creditCardNumber'].hasError('inv'));
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

    if (this.formLoginInformation.valid && this.formPersonalInformation.valid && this.formCreditCardInformation.valid && !this.invalidZip &&
    !this.invalidPassword && !this.invalidCvc && !this.invalidBillingZip && !this.showCreditCardError && !this.noAccountTypeSelected &&
    this.passwordsMatch) {
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

      console.log("Full Name: " + this.formPersonalInformation.value.fullName);
      console.log("DOB: " + this.formPersonalInformation.value.DOB);
      console.log("Address 1: " + this.formPersonalInformation.value.addressLine1);
      console.log("Address 2: " + this.formPersonalInformation.value.addressLine2);
      console.log("State: " + this.formPersonalInformation.value.state);
      console.log("City: " + this.formPersonalInformation.value.city);
      console.log("Zip: " + this.formPersonalInformation.value.zipCode);
      console.log("Country: " + this.country);
      console.log("Pro: " + this.formLoginInformation.value.checkboxPro);
      console.log("Customer: " + this.formLoginInformation.value.checkboxConsumer);
      console.log("Business Type: " + this.individual.checked ? "individual" : "business");
      console.log("Email: " + this.formLoginInformation.value.email);
      console.log("Password: " + this.formLoginInformation.value.password1);

      let credentials = {
        email: this.formLoginInformation.value.email,
        password: this.formLoginInformation.value.password1
      };
      if (this.authService.login(credentials)) {
        this.navCtrl.push(TabsPage)
          .catch(() => {
            this.authService.logout();
            this.app.getRootNav().setRoot(LoginPage);
          });
        this.presentToast();
      }
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Account created!',
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
