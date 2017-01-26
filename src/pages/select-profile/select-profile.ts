import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-select-profile',
  templateUrl: 'select-profile.html'
})
export class SelectProfilePage {

  private user: any;
  private switchProfile: any;

  constructor(public navCtrl: NavController, private params: NavParams) {
    this.user = JSON.parse(localStorage.getItem('current_user'));
    this.switchProfile = params.get('switch_profile');

    // This is just in case the user exits the app before selecting a profile, we don't want them in limbo.
    localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[0]));
  }

  setProProfile() {
    localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[0]));
    this.navCtrl.setRoot(TabsPage);
  }

  setConsumerProfile() {
    localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[1]));
    this.navCtrl.setRoot(TabsPage);
  }

}
