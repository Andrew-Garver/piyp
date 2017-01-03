import { Component } from '@angular/core';

import {NavController, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {
  private username: string;
  private password: string;
  private confirmPassword: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  }

  signUp() {
    // TODO
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
