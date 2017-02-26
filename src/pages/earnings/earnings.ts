import {Component} from '@angular/core';

import {NavController} from "ionic-angular";

@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html'
})

export class EarningsPage{

  private currentProfile: any;

  constructor(private navCtrl: NavController) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
  }

}
