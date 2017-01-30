import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-intro-slides',
  templateUrl: 'intro-slides.html',
  providers: [UserService]
})
export class IntroSlidesPage {

  constructor(public navCtrl: NavController) {

  }

  letsGo() {
    localStorage.setItem('has_seen_intro', 'true');
    this.navCtrl.push(LoginPage)
  }

}
