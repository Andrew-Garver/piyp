import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {ProfilePage} from "../../profile/profile";

@Component({
  selector: 'page-stripe-tos',
  templateUrl: 'stripe-tos.html'
})
export class StripeTosPage {

  constructor(public navCtrl: NavController) {
  }

  finish() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  declineTos() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
  }

}
