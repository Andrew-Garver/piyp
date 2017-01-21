import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";

@Component({
  selector: 'page-profile-dob-form',
  templateUrl: 'dob.html'
})
export class ProfileDOBForm {


  constructor(public navCtrl: NavController) {
  }

  nextPage() {
    this.navCtrl.push(ProfilePersonalAddressForm);
  }
}
