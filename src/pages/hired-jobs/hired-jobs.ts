import {Component, OnInit, Injectable} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Job} from "../../entities/job";
// import {DatabaseService} from "../../services/database.service";
import {JobDetailsPage} from "../job-details/job-details";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'page-hired-jobs',
  templateUrl: 'hired-jobs.html',
  // providers: [DatabaseService]
})

export class HiredJobsPage implements OnInit {

  hiredJobs: Job[];

  constructor(/*private databaseService: DatabaseService,*/ /*private authService: AuthService*/) {}

  ngOnInit(): void {
    // this.hiredJobs = this.databaseService.getAllJobs();
  }

  private viewJobDetails(job: Job) {
    console.log(job);
    // this.authService.push(JobDetailsPage);
  }

}
