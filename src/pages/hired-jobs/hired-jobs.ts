import {Component} from '@angular/core';

import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  providers: [DatabaseService, AuthService, JobService]
})

export class HiredJobsPage {

  private profile: any;
  private hiredJobs: any;

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
        this.hiredJobs = jobs;
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
