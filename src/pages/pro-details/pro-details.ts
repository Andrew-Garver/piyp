import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {Pro} from "../../entities/pro";

@Component({
  selector: 'page-pro-details',
  templateUrl: 'pro-details.html',
  providers: [AuthService]
})

export class ProDetailsPage {

  selectedPro: Pro;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.selectedPro = params.get("pro");
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
