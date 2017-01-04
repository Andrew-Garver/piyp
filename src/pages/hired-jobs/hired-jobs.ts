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

  private viewJobDetails(jobId: number) {
    if (jobId) {
      let selectedJob = this.databaseService.getJobById(jobId);
      if (!selectedJob) {
        this.navCtrl.push(ErrorPage);
      }
      else {
        this.navCtrl.push(JobDetailsPage, {job: selectedJob}).catch(() => this.navCtrl.push(LoginPage));
      }
    }
  }


}
