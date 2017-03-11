import {Component} from '@angular/core';

import {NavController, App, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {CreditCardPage} from "../profile-payment-info-forms/credit-card/credit-card";

@Component({
  selector: 'page-credit-cards',
  templateUrl: 'credit-cards.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})
export class CreditCardsPage {

  private creditCards: any;
  private edit: boolean;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private toastService: ToastService, private navParams: NavParams) {
    this.edit = navParams.get("edit");
  }

  ionViewWillEnter() {
    this.creditCards = [{
      brand: "Visa",
      last4: "2424"
    }];
  }

  private updateCard() {
    this.navCtrl.push(CreditCardPage, {edit: this.edit})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.app.getRootNav().setRoot(LoginPage);
            this.toastService.presentToast("Your session has expired. Please login again.");
          });
      });
  }

}
