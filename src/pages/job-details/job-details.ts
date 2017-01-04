import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Job} from "../../entities/job";
import {AuthService} from "../../services/auth/auth.service";
import {DatabaseService} from "../../services/database.service";
import {ErrorPage} from "../error/error";
import {LoginPage} from "../login/login";
import {Customer} from "../../entities/customer";
import {CustomerDetailsPage} from "../customer-details/customer-details";
import {Pro} from "../../entities/pro";
import {ProDetailsPage} from "../pro-details/pro-details";

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

  private viewCustomerDetails(customer: Customer) {
    if (customer) {
        this.navCtrl.push(CustomerDetailsPage, {customer: customer}).catch(() => this.navCtrl.push(LoginPage));
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private viewProDetails(pro: Pro) {
    if (pro) {
      this.navCtrl.push(ProDetailsPage, {pro: pro}).catch(() => this.navCtrl.push(LoginPage));
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

}
