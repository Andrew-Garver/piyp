import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StripeTosPage} from "../stripe-tos/stripe-tos";
import {ProfilePage} from "../../profile/profile";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ExternalAccountService} from "../../../services/external-account.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'page-bank-info',
  templateUrl: 'bank-info.html',
  providers: [ExternalAccountService, LoadingService]
})
export class BankInfoForm {

  private bankAccountInfoForm: FormGroup;
  private formFieldsMissing: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private externalAccountService: ExternalAccountService, private loadingService: LoadingService) {
    this.bankAccountInfoForm = formBuilder.group({
      accountHolderName: ['', Validators.required],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      routingNumber: ['', Validators.required],
    });
  }

  submit() {
    if (this.bankAccountInfoForm.valid) {
      this.formFieldsMissing = false;
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
        this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
        })
        .catch((err) => {
        this.loadingService.hideLoading();
          console.log("Error");
          console.log(err);
        });
    }
    else {
      this.formFieldsMissing = true;
    }
  }

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<any> {
    let formData = {
      routingNumber: this.bankAccountInfoForm.value.routingNumber,
      accountNumber: this.bankAccountInfoForm.value.accountNumber,
      accountHolderName: this.bankAccountInfoForm.value.accountHolderName,
      accountHolderType: this.bankAccountInfoForm.value.accountHolderType
    };

    return new Promise((resolve, reject) => {
      let currentProfileId = JSON.parse(localStorage.getItem('current_profile'))._id;
      this.externalAccountService.createBankToken(formData)
        .then((token) => {
          console.log("We got the bank token");
          return this.externalAccountService.linkExternalAccount(currentProfileId, token);
        })
        .then((data) => {
          console.log("successfully did the bank thing");
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

}
