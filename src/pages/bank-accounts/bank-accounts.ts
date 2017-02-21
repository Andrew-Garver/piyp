import {Component} from '@angular/core';

import {NavController, App, NavParams} from 'ionic-angular';
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
  private edit: boolean;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private toastService: ToastService, private navParams: NavParams) {
    this.edit = navParams.get("edit");
  }

  ionViewWillEnter() {
    this.bankAccounts = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.external_accounts.data;
  }

  private updateBank() {
    this.navCtrl.push(BankInfoForm, {edit: this.edit})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.app.getRootNav().setRoot(LoginPage);
            this.toastService.presentToast("Your session has expired. Please login again.");
          });
      });
  }

}
