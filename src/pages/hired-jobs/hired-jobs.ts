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
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  providers: [AuthService, JobService, LoadingService, ToastService]
})

export class HiredJobsPage {

  private profile: any;
  private hiredJobs: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private loadingService: LoadingService,
              private toastService: ToastService) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    let params = {
      profile: this.profile._id,
      queryBy: 'acceptedBids'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
        this.loadingService.hideLoading();
        this.hiredJobs = jobs.filter((job) => {
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

  private viewJobDetails(job: Job) {
    if (job) {
      this.navCtrl.push(JobDetailsPage, {job: job})
        .catch(() => {
          this.authService.logout()
            .then(() => this.app.getRootNav().setRoot(LoginPage));
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }


}
