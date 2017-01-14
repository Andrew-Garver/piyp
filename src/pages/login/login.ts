import {Component} from '@angular/core';

import {ModalController, NavController} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth.service";
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
    this.authService.login(credentials)
      .then((result) => {
        console.log(result);
        this.navCtrl.push(TabsPage)
      }, (err) => {
        console.log("Error");
        console.log(err);
      });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
