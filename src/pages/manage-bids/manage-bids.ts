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

  private currentProfile: any;
  private bidsPending: any;
  private bidsWon: any;
  private bidsLost: any;
  private segment: any = "bidsPending";

  constructor(private navCtrl: NavController, private toastService: ToastService,
              private authService: AuthService, private app: App,
              private loadingService: LoadingService, private jobService: JobService) {
    this.currentProfile = JSON.parse(localStorage.getItem("current_profile"));
  }

  ionViewWillEnter() {
    let params = {
      profile: this.currentProfile._id,
      queryBy: 'placedBids'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.bidsPending = jobs;
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  fetchBidData() {
    let params = {
      profile: this.currentProfile._id,
    };

    switch (this.segment) {
      case "bidsPending":
        params["queryBy"] = "placedBids";
        break;
      case "bidsWon":
      case "bidsLost":
        params["queryBy"] = "all";
        break;
    }

    this.jobService.getJobs(params)
      .then((jobs) => {
        if (jobs) {
          this.bidsWon = [];
          this.bidsLost = [];
          console.log(jobs);
          for (let job of jobs) {
            if (job.acceptedBid && job.bids && job.bids.length > 0) {
              if (job.acceptedBid === job.bids[0]._id) {
                this.bidsWon.push(job);
              }
              else {
                this.bidsLost.push(job);
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.toastService.presentToast(err);
      })
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
