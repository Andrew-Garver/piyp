import {Component, OnInit} from '@angular/core';

import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {Customer} from "../../entities/customer";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  providers: [DatabaseService]
})

export class HiredJobsPage implements OnInit {

  hiredJobs: Job[];
  profile: any;

  constructor(private databaseService: DatabaseService, private navCtrl: NavController,
              private authService: AuthService, private app: App) {
    this.profile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ngOnInit() {
    console.log(this.profile._id);
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
