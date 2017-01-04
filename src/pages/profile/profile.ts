import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../services/auth/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthService]
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
    this.navCtrl.push(LoginPage);
  }

}
