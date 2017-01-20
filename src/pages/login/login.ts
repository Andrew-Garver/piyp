import {Component, OnInit} from '@angular/core';

import {ModalController, NavController, ActionSheetController, App} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {SelectProfilePage} from "../select-profile/select-profile";

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

  constructor(public modalCtrl: ModalController, private authService: AuthService, private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController, private app: App) {

  }

  ngOnInit() {
    // let refreshToken = localStorage.getItem("refresh_token");
    //
    // let tokenExpiry = this.authService.getTokenExpiry(refreshToken);
    //
    // console.log("TOKEN EXPIRES AT ");
    // console.log(tokenExpiry);
    //
    // if (this.authService.loggedIn()) {
    //   this.navCtrl.push(TabsPage);
    // }

  }

  login(credentials): void {
    // this.authService.login(credentials)
    //   .then((result) => {
    //     return this.authService.getUser();
    //   })
    //   .then((result) => {
    //     if (this.authService.getUserProfile() === 1) {
    //       this.navCtrl.push(TabsPage);
    //     }
    //     else {
          this.navCtrl.push(SelectProfilePage);
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
