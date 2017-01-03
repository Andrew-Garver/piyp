import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Job} from "../../entities/job";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html'
})
export class JobDetailsPage {

  selectedJob: Job;

  constructor(public navCtrl: NavController) {

  }

}
