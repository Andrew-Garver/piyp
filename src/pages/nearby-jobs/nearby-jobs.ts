import {Component} from '@angular/core';

import {NavController, App, NavParams} from 'ionic-angular';
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
        console.log(jobs);
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });

  }

  private viewJobDetails(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(JobDetailsPage, {job: selectedJob})
        .catch((err) => {
          console.log("the error is: ");
          console.log(err);
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
