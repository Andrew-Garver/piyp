import {Component} from '@angular/core';
import {MenuController} from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private profilePage: any;
  private loadProgress: number;

  constructor(private menuCtrl: MenuController) {
    this.profilePage = ProfilePage;
    this.loadProgress = 25;
  }

}
