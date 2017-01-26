import {Component, OnInit, DoCheck} from '@angular/core';
import {Platform, App, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {LoginPage} from "../pages/login/login";
import {AuthService} from "../services/auth.service";
import {SelectProfilePage} from "../pages/select-profile/select-profile";


@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp implements DoCheck {
  rootPage = LoginPage;

  private currentProfileType: any;
  private numProfiles: number;

  constructor(platform: Platform, private authService: AuthService, private app: App) {
    // localStorage.clear();
    // localStorage.setItem('refresh_token', "Oi0cpGv1Keku2edFK80ZNUdnxhCRLCXhh5zE0NarmjBI6DmbCauDTwsuaSKoTNkv");
    // localStorage.setItem('access_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFuZHJld3NnYXJ2ZXJAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQW5kcmV3IiwibGFzdE5hbWUiOiJHYXJ2ZXIiLCJleHAiOjE0ODQ4NTg5NjJ9.d6oUyAZKmo_CezVD1ONDMUH3owHj8wekc8wUu8At-VM");
    // localStorage.setItem('current_user', "{\"firstName\":\"Andrew\",\"lastName\":\"Garver\",\"email\":\"andrewsgarver@gmail.com\",\"profiles\":[{\"type\":\"pro\",\"_id\":\"5880103876b2491407b6a39e\",\"stripeAccountId\":null},{\"type\":\"consumer\",\"_id\":\"5880103876b2491407b6a39d\",\"stripeAccountId\":null}]}");

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
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

  logout() {
    this.authService.logout()
      .then(() => this.app.getRootNav().setRoot(LoginPage));
  }
}
