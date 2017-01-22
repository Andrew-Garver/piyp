import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {ProfilePage} from "../../profile/profile";

@Component({
  selector: 'page-business-services',
  templateUrl: 'business-services.html'
})
export class BusinessServicesForm {
  private services: any;
  private noServicesSelected: boolean = false;

  constructor(public navCtrl: NavController) {
    this.services = [
      {category: "Automobile Repairs"},
      {category: "Landscaping"},
      {category: "Lawn Care"},
      {category: "Pool Maintenance"},
      {category: "Tech Support"}
    ]
  }

  finishForms() {
    if (this.services.filter(s => s.checked == true).length > 0) {
      this.noServicesSelected = false;
      this.postData()
        .then(() => {
          this.navCtrl.setRoot(ProfilePage);
        });
    }
    else {
      this.noServicesSelected = true;
    }
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
