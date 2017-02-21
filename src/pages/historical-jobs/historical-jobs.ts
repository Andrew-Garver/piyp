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
  selector: 'page-historical-jobs',
  templateUrl: 'historical-jobs.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})
export class HistoricalJobsPage {

  private profile: any;
  private jobs: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private navParams: NavParams,
              private loadingService: LoadingService, private toastService: ToastService) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
    this.jobs = navParams.get("params");
  }

  private viewJobDetails(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(JobDetailsPage, {job: selectedJob, historical: true})
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
