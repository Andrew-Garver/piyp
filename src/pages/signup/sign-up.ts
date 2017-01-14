import {Component, ViewChild} from '@angular/core';

import {NavController, Slides, ToastController, Checkbox, App} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";
import {AuthService} from "../../services/auth.service";
import {AccountCreationService} from "../../services/account-creation.service";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService, AccountCreationService, SignUpValidator]
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

  constructor(public navCtrl: NavController, private authService: AuthService,
              public formBuilder: FormBuilder, private toastCtrl: ToastController,
              private app: App, private accountCretionService: AccountCreationService,
              private signUpValidator: SignUpValidator) {
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
      email: ['', Validators.compose([Validators.maxLength(45), Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}')]), signUpValidator.validateEmail],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      checkboxPro: [null],
      checkboxConsumer: [null]
    });

    this.formPersonalInformation = formBuilder.group({
      fullName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
      DOB: ['', Validators.compose([signUpValidator.validateDOB, Validators.required])],
      addressLine1: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*'), Validators.required]), null],
      addressLine2: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null],
      businessType: ["individual"]
    });

    this.formCreditCardInformation = formBuilder.group({
      creditCardNumber: ['', Validators.compose([signUpValidator.validateCreditCard, Validators.required])],
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

      let accountInfo = {
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

      let paymentInfo = {
        creditCardNumber: this.formCreditCardInformation.value.creditCardNumber,
        cvc: this.formCreditCardInformation.value.cvc,
        expDate: this.formCreditCardInformation.value.expirationDate,
        billingZip: this.formCreditCardInformation.value.billingZipCode
      };

      this.accountCretionService.testPaymentInfo(paymentInfo)
        .then((result) => {
          console.log("Payment token acquired! Creating account now.");
          console.log(result);
          accountInfo.paymentToken = result;
          this.accountCretionService.createAccount(accountInfo)
            .then((result) => {
              console.log("JWT fetched successfully from server!");
              console.log(result);
            }, (err) => {
              console.log("Failed to create account!");
              console.log(err);
            });
        }, (err) => {
          console.log("Failed to gen payment token!");
          console.log(err);
        });

    }
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
