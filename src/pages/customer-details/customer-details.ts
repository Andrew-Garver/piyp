import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {Customer} from "../../entities/customer";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
  providers: [AuthService]
})

export class CustomerDetailsPage {

  private consumer: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.consumer = params.get("consumerInfo");
    console.log(this.consumer)
  }

  ionViewCanEnter(): Promise<boolean> {
    return new  Promise((resolve, reject) => {
      this.authService.loggedIn()
        .then((data) => {
          if (data) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

}
