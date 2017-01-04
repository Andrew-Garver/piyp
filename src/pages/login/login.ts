import {Component} from '@angular/core';

import {ModalController, NavController} from 'ionic-angular';
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth/auth.service";
import {TabsPage} from "../tabs/tabs";

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})

export class LoginPage {

  credentials: Credentials;
  tabsElement: any;


  constructor(public modalCtrl: ModalController, private authService: AuthService, private navCtrl: NavController) {
    // this.tabsElement = document.querySelector('.tabbar');

  }

  // ionViewWillEnter() {
  //   if (this.tabsElement) {
  //     console.log("hiding tabs");
  //     this.tabsElement.style.display = 'none';
  //   }
  // }
  //
  // ionViewWillLeave() {
  //   if (this.tabsElement) {
  //     console.log("showing tabs");
  //     this.tabsElement.style.display = '';
  //   }
  // }

  login(credentials): void {
    console.log('Logging in...');
    if (this.authService.login(credentials)) {
      this.navCtrl.push(TabsPage)
    }
    else {
      // TODO
    }
  }

  presentModal() {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  };

}
