import {Component, OnInit, DoCheck} from '@angular/core';
import {Platform, App, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, Camera} from 'ionic-native';

import {LoginPage} from "../pages/login/login";
import {AuthService} from "../services/auth.service";
import {SelectProfilePage} from "../pages/select-profile/select-profile";
import {SelectInfoToEditPage} from "../pages/settings/personal-info/select-info-to-edit";
import {ErrorPage} from "../pages/error/error";
import {ToastService} from "../services/toast.service";
import {ProfilePage} from "../pages/profile/profile";
import {LoadingService} from "../services/loading.service";
import {IntroSlidesPage} from "../pages/into-slides/intro-slides";
import {TabsPage} from "../pages/tabs/tabs";
import {FindJobFormPage} from "../pages/find-job-form/find-job-form";
import {RequestJobFormPage} from "../pages/request-job-form/request-job-form";
import {BidsPage} from "../pages/bids/bids";
import {HiredJobsPage} from "../pages/hired-jobs/hired-jobs";
import {EarningsPage} from "../pages/earnings/earnings";
import {ProfileService} from "../services/profile.service";
import {ManageBidsPage} from "../pages/manage-bids/manage-bids";


@Component({
  selector: 'menu-styles',
  templateUrl: 'app.html'
})

export class MyApp implements DoCheck, OnInit {
  rootPage: any = LoginPage;

  private currentProfile: any;
  private currentUser: any;
  private numProfiles: number;
  private profilePic: any;
  private findNewProjects: any = FindJobFormPage;
  private bids: any = ManageBidsPage;
  private projects: any = HiredJobsPage;
  private earnings: any = EarningsPage;
  private account: any = SelectProfilePage;
  private findAPro: any = RequestJobFormPage;
  private settings: any = SelectInfoToEditPage;

  constructor(private platform: Platform, private authService: AuthService, private app: App,
              private toastService: ToastService, private profileService: ProfileService) {
    // localStorage.clear();
  }

  ngOnInit() {
    this.authService.loggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          let profileType = JSON.parse(localStorage.getItem('current_profile')).type;
          if (profileType && profileType === "consumer") {
            this.rootPage = RequestJobFormPage;
          }
          else {
            this.rootPage = FindJobFormPage
          }
          if (this.currentProfile.profilePicture) {
            return this.profileService.getProfilePicture(this.currentProfile._id, {pictureURI: this.currentProfile.profilePicture});
          }
          else {
            return null;
          }
        }
        else {
          if (!localStorage.getItem('has_seen_intro')) {
            this.rootPage = IntroSlidesPage;
          }
          else {
            this.rootPage = LoginPage;
          }
          return null;
        }
      })
      .then(() => {
        return this.platform.ready().then(() => {
          StatusBar.styleDefault();
          Splashscreen.hide();
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("something went wrong auto-logging")
      });
  }

  ngDoCheck() {
    if (localStorage.getItem('current_profile')) {
      let profile = JSON.parse(localStorage.getItem('current_profile'));
      this.currentProfile = profile;
      this.profilePic = localStorage.getItem('profile_picture');
    }

    if (localStorage.getItem('current_user')) {
      let userProfiles = JSON.parse(localStorage.getItem('current_user')).profiles;
      this.numProfiles = userProfiles.length;
      this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    }
  }

  goToPage(page) {
    if (page) {
      this.app.getRootNav().setRoot(page)
        .catch(() => {
          this.authService.logout()
            .then(() => {
              this.app.getRootNav().setRoot(LoginPage);
              this.toastService.presentToast("Your session has expired. Please login again.");
            });
        });
    }
    else {
      this.app.getRootNav().push(ErrorPage);
    }
  }

  logout() {
    this.authService.logout()
      .then(() => this.app.getRootNav().setRoot(LoginPage));
  }
}
