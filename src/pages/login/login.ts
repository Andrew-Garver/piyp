import {Component, OnInit} from '@angular/core';

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

export class LoginPage implements OnInit {

  credentials: Credentials;

  constructor(public modalCtrl: ModalController, private authService: AuthService, private navCtrl: NavController) {

  }

  ngOnInit() {
    let refreshToken = localStorage.getItem("refresh_token");

    let tokenExpiry = this.authService.getTokenExpiry(refreshToken);

    console.log(tokenExpiry);

    if (this.authService.loggedIn()) {
      this.navCtrl.push(TabsPage);
    }

  }

  login(credentials): void {
    console.log('Logging in...');
    this.authService.login(credentials)
      .then((result) => {
        console.log("logged in");
        return this.authService.getUser();
      })
      .then((result) => {
        console.log("User gotten");
        this.navCtrl.push(TabsPage)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
