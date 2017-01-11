import {Component} from '@angular/core';

import {ModalController, NavController} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth/auth.service";
import {TabsPage} from "../tabs/tabs";

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})

export class LoginPage {

  credentials: Credentials;

  constructor(public modalCtrl: ModalController, private authService: AuthService, private navCtrl: NavController) {

  }

  login(credentials): void {
    console.log('Logging in...');
    if (this.authService.login(credentials)) {
      this.navCtrl.push(TabsPage)
    }
    else {
      // TODO
    }
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
