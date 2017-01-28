import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private toastService: ToastService) {
    this.creditCards = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.sources.data;
  }

  private addNewCard() {
    //TODO: Right now, this just updates the one card they already have
    this.navCtrl.push(CreditCardPage)
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.app.getRootNav().setRoot(LoginPage);
            this.toastService.presentToast("Your session has expired. Please login again.");
          });
      });
  }

  deleteCard(cardId) {
    console.log("Deleting card");
  }

  makeCardPrimary(cardId) {
    console.log("Primary card");
  }

}
