import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Job} from "../../entities/job";

@Component({
  selector: 'page-job-requests',
  templateUrl: 'job-requests.html'
})
export class JobRequestsPage {

  requestedJobs: Job[];

  constructor(public navCtrl: NavController) {

  }

}
