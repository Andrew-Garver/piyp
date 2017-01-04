import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth/auth.service";
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

  ionViewCanEnter(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

}
