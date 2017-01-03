import {Component} from '@angular/core';

import { ModalController } from 'ionic-angular';
import {DatabaseService} from "../../services/database.service";
import {SignUpPage} from "../signup/sign-up";
import {AuthService} from "../../services/auth/auth.service";

interface Credentials {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [DatabaseService, AuthService]
})

export class LoginPage {

  credentials: Credentials;

  constructor(public modalCtrl: ModalController, private authService: AuthService) {

  }

  login(credentials): void {
    console.log('Logging in...');
    this.authService.login(credentials);
  }

  presentModal() {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.present();
  };

}
