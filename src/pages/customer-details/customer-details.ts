import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {Customer} from "../../entities/customer";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
  providers: [AuthService]
})

export class CustomerDetailsPage {

  customer: Customer;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.customer = params.get("customer");
  }

  ionViewCanEnter(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

}
