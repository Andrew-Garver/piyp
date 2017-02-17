import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-rate-user',
  templateUrl: 'rate-user.html',
  providers: [AuthService, LoadingService, ToastService, JobService],
})
export class RateUserPage {

  private formUserReview: FormGroup;
  private rating: number;
  private jobId: any;
  private currentProfile: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private loadingService: LoadingService, private jobService: JobService,
              private toastService: ToastService, private navParams: NavParams,) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.jobId = navParams.get('jobId');
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
          this.navCtrl.popToRoot();
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
  }

  postData(): Promise<any> {
    let params = {
      jobId: this.jobId,
      rating: this.rating,
      review: this.formUserReview.value.review,
      profileType: this.currentProfile.type === "consumer" ? "pro" : "consumer"
    };
    return this.jobService.leaveReview(params);
  }

}
