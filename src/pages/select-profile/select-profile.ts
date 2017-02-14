import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoadingService} from "../../services/loading.service";
import {ProfileService} from "../../services/profile.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-select-profile',
  templateUrl: 'select-profile.html',
  providers: [LoadingService, ProfileService, ToastService]
})
export class SelectProfilePage {

  private user: any;
  private switchProfile: any;

  constructor(public navCtrl: NavController, private params: NavParams, private loadingService: LoadingService,
  private profileService: ProfileService, private toastService: ToastService) {
    this.user = JSON.parse(localStorage.getItem('current_user'));
    this.switchProfile = params.get('switch_profile');

    // This is just in case the user exits the app before selecting a profile, we don't want them in limbo.
    if (!localStorage.getItem('current_profile')) {
      localStorage.setItem('current_profile', JSON.stringify(this.user.profiles[0]));
    }
  }

  setProfile(profileId) {
    this.loadingService.presentLoading();
    this.profileService.getUserProfile(this.user.profiles[profileId]._id)
      .then((profile) => {
        this.loadingService.hideLoading();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        console.log(err);
      });
  }
}
