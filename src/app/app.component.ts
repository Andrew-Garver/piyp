import {Component, OnInit, DoCheck} from '@angular/core';
import {Platform, App, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

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


@Component({
  templateUrl: 'app.html',
  providers: [AuthService, ToastService, LoadingService]
})
export class MyApp implements DoCheck, OnInit {
  rootPage: any = LoginPage;

  private currentProfileType: any;
  private numProfiles: number;
  private selectInfoPage: any = SelectInfoToEditPage;

  constructor(private platform: Platform, private authService: AuthService, private app: App,
              private toastService: ToastService, private loadingService: LoadingService) {
    // localStorage.clear();
    if (!localStorage.getItem('has_seen_intro'))
    {
      this.rootPage = IntroSlidesPage;
    }
  }

  ngOnInit() {
    this.authService.loggedIn()
      .then((data) => {
        if (data) {
          this.rootPage = TabsPage;
        }
        this.platform.ready().then(() => {
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
      this.currentProfileType = profile.type;
    }

    if (localStorage.getItem('current_user')) {
      let userProfiles = JSON.parse(localStorage.getItem('current_user')).profiles;
      this.numProfiles = userProfiles.length;
    }
  }

  switchProfile() {
    this.app.getRootNav().push(SelectProfilePage, {switch_profile: true});
  }

  pushPage(page) {
    if (page) {
      this.app.getRootNav().push(page)
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

  setupNewProfile(type): Promise<any> {
    this.app.getRootNav().setRoot(ProfilePage);
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //   this.loadingService.presentLoading();
    //   this.registrationService.addProfile({profileType: type})
    //     .then((data) => {
    //       this.loadingService.hideLoading();
    //       localStorage.setItem('current_profile', JSON.stringify(data.profile));
    //       this.app.getRootNav().setRoot(ProfilePage);
    //       resolve(data.profile);
    //     })
    //     .catch((err) => {
    //       this.loadingService.hideLoading();
    //       this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.");
    //       console.log(err.message);
    //       reject(err);
    //     });
    // });
  }

  logout() {
    this.authService.logout()
      .then(() => this.app.getRootNav().setRoot(LoginPage));
  }
}
