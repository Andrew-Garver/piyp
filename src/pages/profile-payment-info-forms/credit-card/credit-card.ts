import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePage} from "../../profile/profile";
import {LoadingService} from "../../../services/loading.service";
import {BillingAddressPage} from "../billing-address/billing-address";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {SignUpValidator} from "../../signup/sign-up.validator";
import {CreditCardService} from "../../../services/credit-card.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html',
  providers: [LoadingService, SignUpValidator, CreditCardService, AuthService, ToastService]
})
export class CreditCardPage {

  private creditCardInfoForm: FormGroup;

  private formFieldsMissing: boolean = false;
  private invalidCvc: boolean = false;
  private invalidBillingZip: boolean = false;
  private showCreditCardError: boolean = false;

  constructor(public navCtrl: NavController, private loadingService: LoadingService,
              private formBuilder: FormBuilder, private signUpValidator: SignUpValidator,
              private creditCardService: CreditCardService, private authService: AuthService,
              private toastService: ToastService) {
    this.formFieldsMissing = false;

    let creditCardValidator = (control) => {
      return this.signUpValidator.validateCreditCard(control);
    };

    this.creditCardInfoForm = formBuilder.group({
      creditCardNumber: ['', Validators.compose([creditCardValidator, Validators.required])],
      cvc: ['', Validators.compose([Validators.pattern('[0-9]{3,4}'), Validators.required])],
      expirationDate: [new Date().toISOString(), Validators.required],
      billingZipCode: ['', Validators.required]
    });
  }

  checkZip(zip) {
    if (zip != undefined && zip.length != 5) {
      this.invalidBillingZip = true;
    }
    else {
      this.invalidBillingZip = false;
    }
  }

  // hide the error message on focus and show it on blur if there is an error
  toggleCreditCardError(toggle) {
    if (!toggle && this.creditCardInfoForm.controls['creditCardNumber'].hasError('invalid credit card')) {
      this.showCreditCardError = true;
    }
    else {
      this.showCreditCardError = false;
    }
  }

  checkCvc() {
    if (this.creditCardInfoForm.value.cvc && (this.creditCardInfoForm.value.cvc.length < 3 ||
      this.creditCardInfoForm.value.cvc.length > 4)) {
      this.invalidCvc = true;
    }
    else {
      this.invalidCvc = false;
    }
  }

  clearBillingZipError() {
    this.invalidBillingZip = false;
  }

  nextForm() {
    this.checkCvc();
    this.checkZip(this.creditCardInfoForm.value.billingZipCode);

    if (!this.invalidBillingZip && !this.invalidCvc && !this.invalidBillingZip) {
      this.formFieldsMissing = false;
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
    else if (!this.creditCardInfoForm.valid) {
      this.formFieldsMissing = true;
    }
  }

  postData(): Promise<any> {
    let expDate = this.creditCardInfoForm.value.expirationDate;
    let paymentInfo = {
      number: this.creditCardInfoForm.value.creditCardNumber,
      cvc: this.creditCardInfoForm.value.cvc,
      exp_month: new Date(expDate).getMonth() + 1,
      exp_year: new Date(expDate).getFullYear(),
      address_zip: this.creditCardInfoForm.value.billingZipCode
    };

    return new Promise((resolve, reject) => {
      let currentProfileId = JSON.parse(localStorage.getItem('current_profile'))._id;
      this.creditCardService.getToken(paymentInfo)
        .then((token) => {
          console.log("We got the card token");
          return this.creditCardService.updateCard(currentProfileId, token);
        })
        .then((data) => {
          console.log("successfully did the credit card thing");
          console.log(data);
          resolve(data.profile);
        })
        .catch((err) => {
          console.log("ERROR");
          console.log(err.message);
          reject(err);
        });
    });
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.loggedIn()
        .then((data) => {
          if (data) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

}
