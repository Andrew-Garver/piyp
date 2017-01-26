import {Component} from '@angular/core';

import {NavController, App, NavParams} from 'ionic-angular';
import {Job} from "../../entities/job";
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-nearby-jobs',
  templateUrl: 'nearby-jobs.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})
export class NearbyJobsPage {

  private profile: any;
  private nearbyJobs: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private navParams: NavParams,
              private loadingService: LoadingService, private toastService: ToastService) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    let params = this.navParams.get('params');
    this.loadingService.presentLoading();
    this.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.nearbyJobs = jobs;
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });

  }

  private viewJobDetails(job: Job) {
    if (job) {
      this.navCtrl.push(JobDetailsPage, {job: job})
        .catch(() => {
          this.authService.logout()
            .then(() => {
              this.app.getRootNav().setRoot(LoginPage);
              this.toastService.presentToast("Your session has expired. Please login again.");
            });
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  getJobs(jobParams): Promise<any> {
    return this.jobService.getJobs(jobParams);
  }

}
