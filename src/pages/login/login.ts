import {Component, OnInit} from '@angular/core';

import {ModalController, NavController, ActionSheetController, App} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {SelectProfilePage} from "../select-profile/select-profile";
import {UserService} from "../../services/user.service";
import {ToastService} from "../../services/toast.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, UserService, ToastService, LoadingService]
})

export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private navCtrl: NavController,
              private userService: UserService, private toastService: ToastService,
              private loadingService: LoadingService) {

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
    this.loadingService.presentLoading();
    this.authService.login(credentials)
      .then((result) => {
        this.loadingService.hideLoading();
        return this.userService.getUser();
      })
      .then((result) => {
        this.loadingService.hideLoading();
        if (this.userService.getNumberOfUserProfiles() === 1) {
          this.navCtrl.push(TabsPage);
        }
        else {
          this.navCtrl.push(SelectProfilePage);
        }
      })
      .catch((err) => {
        console.log(err);
        this.loadingService.hideLoading();
        this.toastService.presentTimedToast("That username or password is incorrect. Please try again")
      });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
