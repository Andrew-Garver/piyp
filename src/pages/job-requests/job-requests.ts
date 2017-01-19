import {Component, OnInit} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {Customer} from "../../entities/customer";
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-job-requests',
  templateUrl: 'job-requests.html',
  providers: [DatabaseService]
})
export class JobRequestsPage implements OnInit {

  requestedJobs: Job[];
  profile: any;

  constructor(public navCtrl: NavController, private databaseService: DatabaseService,
              private app: App, private authService: AuthService) {
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
