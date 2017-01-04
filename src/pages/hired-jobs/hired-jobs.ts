import {Component, OnInit} from '@angular/core';

import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  providers: [DatabaseService]
})

export class HiredJobsPage implements OnInit {

  hiredJobs: Job[];

  constructor(private databaseService: DatabaseService, private navCtrl: NavController) {
  }

  ngOnInit(): void {
    this.hiredJobs = this.databaseService.getAllJobs();
  }

  private viewJobDetails(job: Job) {
    if (job) {
      this.navCtrl.push(JobDetailsPage, {job: job}).catch(() => this.navCtrl.push(LoginPage));
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }


}
