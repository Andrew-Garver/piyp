import {Component} from '@angular/core';

import {Job} from "../../entities/job";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-my-projects',
  templateUrl: 'my-projects.html'
})

export class MyProjectsPage {

  private currentProfile: any;
  private jobsNew: any;
  private jobsInProgress: any;
  private jobsCompleted: any;
  private segment: any = "jobsNew";

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private loadingService: LoadingService,
              private toastService: ToastService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    let params = {
      profile: this.currentProfile._id,
      queryBy: 'acceptedBids'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.jobsNew = jobs.filter((job) => {
          return !job.proLeftFeedback;
        });
        console.log(jobs);
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  fetchJobData() {
    console.log("Fetching job data");
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
