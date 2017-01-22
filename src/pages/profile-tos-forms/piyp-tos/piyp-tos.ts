import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StripeTosPage} from "../stripe-tos/stripe-tos";
import {TabsPage} from "../../tabs/tabs";
import {ProfilePage} from "../../profile/profile";

@Component({
  selector: 'page-piyp-tos',
  templateUrl: 'piyp-tos.html'
})
export class PiypTosPage {

  constructor(public navCtrl: NavController) {
  }

  nextForm() {
    this.postData()
      .then(() => {
        this.navCtrl.push(StripeTosPage);
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
