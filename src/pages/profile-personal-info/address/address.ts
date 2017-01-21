import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: 'page-profile-personal-address-form',
  templateUrl: 'address.html'
})
export class ProfilePersonalAddressForm {


  constructor(public navCtrl: NavController) {
  }

  postData() {
    //TODO: Post the data
    this.navCtrl.setRoot(TabsPage);
  }
}
