import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {StripeTosPage} from "../stripe-tos/stripe-tos";
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
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }

  declineTos() {
    this.navCtrl.setRoot(ProfilePage);
  }

  postData(): Promise<any> {
    return Promise.resolve(true);
  }

}
