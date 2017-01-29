import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {BankInfoForm} from "../profile-bank-info-forms/bank-info/bank-info";

@Component({
  selector: 'page-bank-accounts',
  templateUrl: 'bank-accounts.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})
export class BankAccountsPage {

  private bankAccounts: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private toastService: ToastService) {
    this.bankAccounts = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.external_accounts.data;
  }

  private addNewBank() {
    //TODO: Right now, this just updates the one bank they already have
    this.navCtrl.push(BankInfoForm)
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.app.getRootNav().setRoot(LoginPage);
            this.toastService.presentToast("Your session has expired. Please login again.");
          });
      });
  }

  deleteBank(bankId) {
    console.log("Deleting bank");
  }

  makeBankPrimary(bankId) {
    console.log("Primary bank");
  }

}
