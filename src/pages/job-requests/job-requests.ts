import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {Job} from "../../entities/job";
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-job-requests',
  templateUrl: 'job-requests.html',
  providers: [AuthService, JobService]
})
export class JobRequestsPage {

  private profile: any;
  private requestedJobs: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    let params = {
      profileId: this.profile._id
    };

    this.jobService.getJobs(params)
      .then((jobs) => {
        this.requestedJobs = jobs;
      })
      .catch((err) => {
      console.log(err);
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
