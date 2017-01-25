import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePage} from "../../profile/profile";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'page-billing-address',
  templateUrl: 'billing-address.html',
  providers: [LoadingService]
})
export class BillingAddressPage {

  constructor(public navCtrl: NavController, private loadingService: LoadingService) {
  }

  finish() {
    this.loadingService.presentLoading();
    this.postData()
      .then(() => {
        this.loadingService.hideLoading();
        this.navCtrl.push(ProfilePage);
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log("error");
        console.log(err);
      });
  }

  declineTos() {
    this.navCtrl.setRoot(ProfilePage);
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
  }

}
