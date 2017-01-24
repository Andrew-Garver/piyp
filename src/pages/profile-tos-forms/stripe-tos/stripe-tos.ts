import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePage} from "../../profile/profile";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'page-stripe-tos',
  templateUrl: 'stripe-tos.html',
  providers: [ProfileService, LoadingService]
})
export class StripeTosPage {

  constructor(public navCtrl: NavController, private profileService: ProfileService,
              private loadingService: LoadingService) {
  }

  finish() {
    this.loadingService.presentLoading();
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
        this.loadingService.hideLoading();
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }

  declineTos() {
    this.navCtrl.setRoot(ProfilePage);
  }

  postData(): Promise<boolean> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    return this.profileService.updateUserProfile(profileId, {tosAccepted: true});
  }

}
