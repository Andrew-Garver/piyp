import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-select-profile',
  templateUrl: 'select-profile.html'
})
export class SelectProfilePage {

  private user: any;

  constructor(public navCtrl: NavController) {
    this.user = JSON.parse(localStorage.getItem('current_user'));
  }

  setProProfile() {
    console.log("setting Pro");
    localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[0]));
    this.navCtrl.setRoot(TabsPage);
  }

  setConsumerProfile() {
    console.log("setting consumer");
    localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[1]));
    this.navCtrl.setRoot(TabsPage);
  }

}
