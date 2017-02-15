import {Component, OnInit} from '@angular/core';

import {ModalController, NavController, ActionSheetController, App} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";
import {SelectProfilePage} from "../select-profile/select-profile";
import {UserService} from "../../services/user.service";
import {ToastService} from "../../services/toast.service";
import {LoadingService} from "../../services/loading.service";
import {IntroSlidesPage} from "../into-slides/intro-slides";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService, UserService, ToastService, LoadingService, ProfileService]
})

export class LoginPage {

  constructor(private authService: AuthService, private navCtrl: NavController,
              private userService: UserService, private toastService: ToastService,
              private loadingService: LoadingService, private profileService: ProfileService) {

  }

  login(credentials): void {
    this.loadingService.presentLoading();
    this.authService.login(credentials)
      .then((result) => {
        return this.userService.getUser();
      })
      .then((user) => {
        if (user.profiles && user.profiles.length > 0) {
          return this.profileService.getUserProfile(user.profiles[0]._id);
        }
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
