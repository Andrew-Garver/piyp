import {Component, OnInit} from '@angular/core';

import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {Customer} from "../../entities/customer";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  providers: [DatabaseService]
})

export class HiredJobsPage implements OnInit {

  hiredJobs: Job[];
  customer: Customer;

  constructor(private databaseService: DatabaseService, private navCtrl: NavController,
              private authService: AuthService, private app: App) {
    this.customer = JSON.parse(localStorage.getItem('current_user'));
  }

  ngOnInit(): void {
    this.databaseService.getHiredJobsByUserId(this.customer.id)
      .then((hiredJobs) => this.hiredJobs = hiredJobs);
  }

  private viewJobDetails(job: Job) {
    if (job) {
      this.navCtrl.push(JobDetailsPage, {job: job})
        .catch(() => {
          this.authService.logout();
          this.app.getRootNav().setRoot(LoginPage);
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }


}
