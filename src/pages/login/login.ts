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
import {FindJobFormPage} from "../find-job-form/find-job-form";
import {RequestJobFormPage} from "../request-job-form/request-job-form";

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
        return null;
      })
      .then((profile) => {
        if (!profile) {
          throw Error("No Profiles Found when logging in");
        }
        if (this.userService.getNumberOfUserProfiles() === 1) {
          if (profile.type === 'consumer') {
            this.navCtrl.setRoot(RequestJobFormPage)
          }
          else {
            this.navCtrl.setRoot(FindJobFormPage);
          }
        }
        else {
          this.navCtrl.setRoot(SelectProfilePage);
        }
        this.loadingService.hideLoading();
        return profile;
      })
      .then((profile) => {
        if (profile.profilePicture) {
          this.profileService.getProfilePicture(profile._id, {pictureURI: profile.profilePicture});
        }
      })
      .catch((err) => {
        console.log(err);
        this.loadingService.hideLoading();
        this.toastService.presentTimedToast(err);
      });
  }

  launchSignUp() {
    this.navCtrl.push(SignUpPage);
  };

}
