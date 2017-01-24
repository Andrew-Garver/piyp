import {Component, OnInit} from '@angular/core';

import {ModalController, NavController, ActionSheetController, App} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {SelectProfilePage} from "../select-profile/select-profile";
import {UserService} from "../../services/user.service";

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, UserService]
})

export class LoginPage implements OnInit {

  credentials: Credentials;

  constructor(public modalCtrl: ModalController, private authService: AuthService, private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController, private app: App, private userService: UserService) {

  }

  ngOnInit() {
    this.authService.loggedIn()
      .then((data) => {
      console.log(data);
        if (data) {
          this.navCtrl.push(TabsPage);
        }
      })
      .catch((err) => {
      console.log(err);
      console.log("something went wrong auto-logging")
      });
  }

  login(credentials): void {
    this.authService.login(credentials)
      .then((result) => {
        return this.userService.getUser();
      })
      .then((result) => {
        if (this.userService.getNumberOfUserProfiles() === 1) {
          this.navCtrl.push(TabsPage);
        }
        else {
          this.navCtrl.push(SelectProfilePage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
