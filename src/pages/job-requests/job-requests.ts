import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-job-requests',
  templateUrl: 'job-requests.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})
export class JobRequestsPage {

  private profile: any;
  private requestedJobs: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private loadingService: LoadingService,
              private toastService: ToastService) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    let params = {
      profile: this.profile._id,
      queryBy: 'creator'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.requestedJobs = jobs;
        console.log(jobs);
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.");
      });
  }

  private viewJobDetails(job) {
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

}
