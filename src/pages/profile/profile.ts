import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthService]
})
export class ProfilePage {

  constructor(private app: App, public navCtrl: NavController, private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
