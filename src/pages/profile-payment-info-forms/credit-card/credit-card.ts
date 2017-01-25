import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePage} from "../../profile/profile";
import {LoadingService} from "../../../services/loading.service";
import {BillingAddressPage} from "../billing-address/billing-address";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {SignUpValidator} from "../../signup/sign-up.validator";

@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html',
  providers: [LoadingService, SignUpValidator]
})
export class CreditCardPage {

  private creditCardInfoForm: FormGroup;

  private formFieldsMissing: boolean = false;
  private invalidCvc: boolean = false;
  private invalidBillingZip: boolean = false;
  private showCreditCardError: boolean = false;
  private creditCardRejected: boolean = false;

  constructor(public navCtrl: NavController, private loadingService: LoadingService,
              private formBuilder: FormBuilder, private signUpValidator: SignUpValidator) {
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
          // this.navCtrl.push(BillingAddressPage);
        })
        .catch((err) => {
          this.loadingService.hideLoading();
          console.log("error");
          console.log(err);
        });
    }
    else if (!this.creditCardInfoForm.valid) {
      this.formFieldsMissing = true;
    }
  }

  postData(): Promise<boolean> {
    // let paymentInfo = {
    //   creditCardNumber: this.formCreditCardInformation.value.creditCardNumber,
    //   cvc: this.formCreditCardInformation.value.cvc,
    //   expDate: this.formCreditCardInformation.value.expirationDate,
    //   billingZip: this.formCreditCardInformation.value.billingZipCode
    // };
    return Promise.resolve(true);
  }

}
