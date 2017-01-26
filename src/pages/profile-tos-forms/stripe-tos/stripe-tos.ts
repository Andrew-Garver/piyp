import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePage} from "../../profile/profile";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'page-stripe-tos',
  templateUrl: 'stripe-tos.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class StripeTosPage {

  constructor(public navCtrl: NavController, private profileService: ProfileService,
              private loadingService: LoadingService, private authService: AuthService,
              private toastService: ToastService) {
  }

  finish() {
    this.loadingService.presentLoading();
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
        this.loadingService.hideLoading();
      })
      .catch((err) => {
        console.log(err);
        this.loadingService.hideLoading();
        this.navCtrl.setRoot(ProfilePage);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  declineTos() {
    this.navCtrl.setRoot(ProfilePage);
  }

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    return this.profileService.updateUserProfile(profileId, {tosAccepted: true});
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.loggedIn()
        .then((data) => {
          if (data) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

}
