import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-rate-user',
  templateUrl: 'rate-user.html',
  providers: [AuthService, LoadingService, ToastService],
})
export class RateUserPage {

  private formUserReview: FormGroup;
  private rating: number;
  private userToBeRated: any;
  private currentProfile: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private authService: AuthService, private loadingService: LoadingService,
              private toastService: ToastService, private navParams: NavParams) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.userToBeRated = navParams.get('userToBeRated');
    this.formUserReview = formBuilder.group({
      review: ['']
    });
  }

  submitReview() {
    if (this.rating > 0) {
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.pop()
            .catch(() => {
              this.authService.logout()
                .then(() => {
                  this.navCtrl.setRoot(LoginPage);
                  this.toastService.presentToast("Your session has expired. Please login again.");
                });
            });
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
  }

  postData(): Promise<any> {
    return Promise.resolve(true);
    // let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    // let params = {
    //   inquirer: profileId,
    //   question: this.formAskQuestion.value.question;
    // };
    // return this.profileService.updateUserProfile(profileId, {params: params});
  }

}
