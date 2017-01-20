import {Component, ViewChild} from '@angular/core';

import {NavController, Slides, ToastController, Checkbox, App, ActionSheetController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";
import {AuthService} from "../../services/auth.service";
import {AccountCreationService} from "../../services/account-creation.service";
import {TabsPage} from "../tabs/tabs";
import {SelectProfilePage} from "../select-profile/select-profile";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService, AccountCreationService, SignUpValidator]
})

export class SignUpPage {

  @ViewChild('signupSlider') slider: Slides;
  @ViewChild('individual') individual: Checkbox;
  @ViewChild('business') business: Checkbox;

  // private formPersonalInformation: FormGroup;
  private formLoginInformation: FormGroup;
  // private formCreditCardInformation: FormGroup;

  // private personalFieldsMissing: boolean;
  private loginFieldsMissing: boolean;
  // private paymentFieldsMissing: boolean;

  // private invalidZip: boolean;
  private invalidPassword: boolean;
  // private invalidCvc: boolean;
  // private invalidBillingZip: boolean;
  // private showCreditCardError: boolean;
  private noAccountTypeSelected: boolean;
  private passwordsMatch: boolean;
  // private creditCardRejected: boolean;

  private checkboxPro: string;
  private checkboxConsumer: string;
  // private DOB: string;
  // private addressLine1: string;
  // private addressLine2: string;
  // private state: string;
  // private city: string;
  // private zipCode: number;
  // private country: string;
  private email: string;
  private password1: string;
  private password2: string;

  constructor(public navCtrl: NavController, private authService: AuthService,
              public formBuilder: FormBuilder, private toastCtrl: ToastController,
              private app: App, private accountCreationService: AccountCreationService,
              private signUpValidator: SignUpValidator, private actionSheetCtrl: ActionSheetController) {
    // this.personalFieldsMissing = false;
    this.loginFieldsMissing = false;
    // this.paymentFieldsMissing = false;
    // this.invalidZip = false;
    this.noAccountTypeSelected = false;
    // this.invalidBillingZip = false;
    // this.invalidCvc = false;
    this.passwordsMatch = true;
    this.invalidPassword = false;
    // this.showCreditCardError = false;
    // this.country = "US";
    // this.creditCardRejected = false;

    let emailValidator = (control) => {
      return this.signUpValidator.validateEmail(control);
    };

    // let creditCardValidator = (control) => {
    //   return this.signUpValidator.validateCreditCard(control);
    // };

    // let dobValidator = (control) => {
    //   return this.signUpValidator.validateDOB(control);
    // };

    this.formLoginInformation = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
      lastName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
      email: ['', Validators.compose([Validators.maxLength(45), Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}')]), emailValidator],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      checkboxPro: [null],
      checkboxConsumer: [null]
    });

    // this.formPersonalInformation = formBuilder.group({
    //   firstName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
    //   lastName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
    //   // DOB: ['', Validators.compose([dobValidator, Validators.required])],
    //   addressLine1: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*'), Validators.required]), null],
    //   addressLine2: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
    //   state: ['', Validators.required],
    //   city: ['', Validators.required],
    //   zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
    //     Validators.pattern('[0-9]*'), Validators.required]), null],
    //   businessType: ["individual"]
    // });

    // this.formCreditCardInformation = formBuilder.group({
    //   creditCardNumber: ['', Validators.compose([creditCardValidator, Validators.required])],
    //   cvc: ['', Validators.compose([Validators.pattern('[0-9]{3,4}'), Validators.required])],
    //   expirationDate: [new Date().toISOString(), Validators.required],
    //   billingZipCode: ['', Validators.required]
    // });
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

    if (this.formLoginInformation.value.password1.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d].{8,}$/.test(this.formLoginInformation.value.password1)) {
      this.invalidPassword = true;
    }
    else {
      this.invalidPassword = false;
    }
  }

  // checkZip(form, zip) {
  //   if (form === this.formPersonalInformation) {
  //     if (zip != undefined && zip.length != 5) {
  //       this.invalidZip = true;
  //     }
  //     else {
  //       this.invalidZip = false;
  //     }
  //   }
  //   else {
  //     if (zip != undefined && zip.length != 5) {
  //       this.invalidBillingZip = true;
  //     }
  //     else {
  //       this.invalidBillingZip = false;
  //     }
  //   }
  // }
  //
  // // hide the error message on focus and show it on blur if there is an error
  // toggleCreditCardError(toggle) {
  //   if (!toggle && this.formCreditCardInformation.controls['creditCardNumber'].hasError('invalid credit card')) {
  //     this.showCreditCardError = true;
  //   }
  //   else {
  //     this.showCreditCardError = false;
  //   }
  // }
  //
  // checkCvc() {
  //   if (this.formCreditCardInformation.value.cvc && (this.formCreditCardInformation.value.cvc.length < 3 ||
  //     this.formCreditCardInformation.value.cvc.length > 4)) {
  //     this.invalidCvc = true;
  //   }
  //   else {
  //     this.invalidCvc = false;
  //   }
  // }
  //
  // clearBillingZipError() {
  //   this.invalidBillingZip = false;
  // }

  formIsSubmittable(): boolean {
    this.checkIfAccountTypeSelected();
    this.checkPasswords();
    if (this.formLoginInformation.valid && !this.noAccountTypeSelected && !this.invalidPassword && this.passwordsMatch) { //&& this.formPersonalInformation.valid && this.formCreditCardInformation.valid && !this.invalidPassword /*&& !this.invalidCvc && !this.invalidBillingZip && !this.showCreditCardError) {
      return true;
    }
    else {
      return false;
    }
  }

  signUp() {
    if (!this.formLoginInformation.valid) {
      this.loginFieldsMissing = true;
      // this.slider.slideTo(0);
    }
    // else if (!this.formPersonalInformation.valid) {
    //   this.personalFieldsMissing = true;
    //   this.slider.slideTo(1);
    // }
    // else if (!this.formCreditCardInformation.valid) {
    //   this.paymentFieldsMissing = true;
    //   this.slider.slideTo(2);
    // }
    else if (this.formIsSubmittable()) {
      // this.personalFieldsMissing = false;
      this.loginFieldsMissing = false;
      // this.paymentFieldsMissing = false;
      // this.invalidZip = false;
      this.invalidPassword = false;
      // this.invalidCvc = false;
      // this.invalidBillingZip = false;
      // this.showCreditCardError = false;
      this.noAccountTypeSelected = false;
      this.passwordsMatch = true;
      // this.creditCardRejected = false;

      let accountInfo = {
        firstName: this.formLoginInformation.value.firstName,
        lastName: this.formLoginInformation.value.lastName,
        isPro: this.formLoginInformation.value.checkboxPro,
        isConsumer: this.formLoginInformation.value.checkboxConsumer,
        email: this.formLoginInformation.value.email,
        password: this.formLoginInformation.value.password1,
      };

      // let paymentInfo = {
      //   creditCardNumber: this.formCreditCardInformation.value.creditCardNumber,
      //   cvc: this.formCreditCardInformation.value.cvc,
      //   expDate: this.formCreditCardInformation.value.expirationDate,
      //   billingZip: this.formCreditCardInformation.value.billingZipCode
      // };

      // this.accountCreationService.testPaymentInfo(paymentInfo)
      //   .then((result) => {
      //     console.log("Payment token acquired! Creating account now.");
      //     console.log(result);
      //     accountInfo.paymentToken = result;
      this.accountCreationService.createAccount(accountInfo)
        .then((result) => {
          console.log("createAccount success");
          return this.authService.getUser();
        })
        .then((result) => {
          console.log("getUser success");
          if (result) {
            if (this.authService.getUserProfile() === 1) {
              this.navCtrl.push(TabsPage)
            }
            else {
              this.navCtrl.push(SelectProfilePage);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.presentToast("Error: Could not create account");
        });

      // }, (err) => {
      //   console.log("Failed to gen payment token!");
      //   console.log(err);
      // });

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

  // slideNext(form) {
  //   if (form === this.formLoginInformation) {
  //     this.checkIfAccountTypeSelected();
  //     this.checkPasswords();
  //     if (!this.noAccountTypeSelected && !this.invalidPassword && this.passwordsMatch &&
  //       this.formLoginInformation.valid) {
  //       this.loginFieldsMissing = false;
  //       this.slider.slideNext();
  //     }
  //     else if (this.formLoginInformation.valid && this.formLoginInformation.value.password1 && this.formLoginInformation.value.password2) {
  //       this.loginFieldsMissing = false;
  //     }
  //     else {
  //       this.loginFieldsMissing = true;
  //     }
  //   }
  //   else if (form === this.formPersonalInformation && !this.formPersonalInformation.valid) {
  //     this.personalFieldsMissing = true;
  //   }
  //   else {
  //     this.personalFieldsMissing = false;
  //     this.slider.slideNext();
  //   }
  // }

}
