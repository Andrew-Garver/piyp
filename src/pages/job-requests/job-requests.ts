import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {Customer} from "../../entities/customer";
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-job-requests',
  templateUrl: 'job-requests.html',
  providers: [DatabaseService]
})
export class JobRequestsPage implements OnInit {

  requestedJobs: Job[];
  customer: Customer;

  constructor(public navCtrl: NavController, private databaseService: DatabaseService) {
    this.customer = JSON.parse(localStorage.getItem('current_user'));
  }

  ngOnInit() {
    if (this.customer) {
      this.requestedJobs = this.databaseService.getOpenJobsByUserId(this.customer.id);
    }
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
