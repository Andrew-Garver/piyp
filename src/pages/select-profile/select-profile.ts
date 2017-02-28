import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {LoadingService} from "../../services/loading.service";
import {ProfileService} from "../../services/profile.service";
import {ToastService} from "../../services/toast.service";
import {FindAProPage} from "../find-a-pro/find-a-pro";
import {FindNewProjectsPage} from "../find-new-projects/find-new-projects";

@Component({
  selector: 'page-select-profile',
  templateUrl: 'select-profile.html'
})
export class SelectProfilePage {

  private user: any;
  private switchProfile: any;

  constructor(public navCtrl: NavController, private params: NavParams, private loadingService: LoadingService,
  private profileService: ProfileService, private toastService: ToastService) {
    this.user = JSON.parse(localStorage.getItem('current_user'));
    this.switchProfile = params.get('switch_profile');
  }

  setProfile(profileId) {
    this.loadingService.presentLoading();
    this.profileService.getUserProfile(this.user.profiles[profileId]._id)
      .then((profile) => {
        if (profile && profile.type === "consumer") {
          this.navCtrl.setRoot(FindAProPage);
        }
        else {
          this.navCtrl.setRoot(FindNewProjectsPage);
        }
        this.loadingService.hideLoading();
        return this.profileService.getProfilePicture(profile._id, {pictureURI: profile.profilePicture});
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        this.toastService.presentToast(err);
        console.log(err);
      });
  }
}
