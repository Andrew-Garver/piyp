import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Job} from "../../entities/job";
import {AuthService} from "../../services/auth/auth.service";
import {DatabaseService} from "../../services/database.service";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [AuthService]
})
export class JobDetailsPage {

  selectedJob: Job;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams) {
    this.selectedJob = params.get("job");
  }

  ionViewCanEnter(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

}
