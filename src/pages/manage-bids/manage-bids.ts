import {Component} from '@angular/core';

import {NavController, App} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import {JobDetailsPage} from "../job-details/job-details";
import {ErrorPage} from "../error/error";
import {LoadingService} from "../../services/loading.service";
import {JobService} from "../../services/job.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-manage-bids',
  templateUrl: 'manage-bids.html',
  providers: [LoadingService, JobService, ToastService]
})

export class ManageBidsPage {

  private profile: any;
  private jobsWithBids: any;

  constructor(private navCtrl: NavController, private toastService: ToastService,
              private authService: AuthService, private app: App,
              private loadingService: LoadingService, private jobService: JobService) {
    this.profile = JSON.parse(localStorage.getItem("current_profile"));
  }

  ionViewWillEnter() {
    let params = {
      profile: this.profile._id,
      queryBy: 'placedBids'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.jobsWithBids = jobs;
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

}
