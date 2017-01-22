import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StripeTosPage} from "../stripe-tos/stripe-tos";
import {ProfilePage} from "../../profile/profile";

@Component({
  selector: 'page-bank-info',
  templateUrl: 'bank-info.html'
})
export class BankInfoForm {

  constructor(public navCtrl: NavController) {
  }

  nextForm() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
  }

}
