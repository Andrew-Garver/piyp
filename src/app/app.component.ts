import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {LoginPage} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    // localStorage.clear(); // TODO: Remove this

    // localStorage.setItem('refresh_token', "Oi0cpGv1Keku2edFK80ZNUdnxhCRLCXhh5zE0NarmjBI6DmbCauDTwsuaSKoTNkv");
    // localStorage.setItem('access_token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFuZHJld3NnYXJ2ZXJAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQW5kcmV3IiwibGFzdE5hbWUiOiJHYXJ2ZXIiLCJleHAiOjE0ODQ4NTg5NjJ9.d6oUyAZKmo_CezVD1ONDMUH3owHj8wekc8wUu8At-VM");
    // localStorage.setItem('current_user', "{\"firstName\":\"Andrew\",\"lastName\":\"Garver\",\"email\":\"andrewsgarver@gmail.com\",\"profiles\":[{\"type\":\"pro\",\"_id\":\"5880103876b2491407b6a39e\",\"stripeAccountId\":null},{\"type\":\"consumer\",\"_id\":\"5880103876b2491407b6a39d\",\"stripeAccountId\":null}]}");

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
