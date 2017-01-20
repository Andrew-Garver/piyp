import {Component, OnInit, ViewChild} from '@angular/core';

import {NavController, NavParams, App, Tabs} from 'ionic-angular';
import {Job} from "../../entities/job";
import {AuthService} from "../../services/auth.service";
import {DatabaseService} from "../../services/database.service";
import {ErrorPage} from "../error/error";
import {LoginPage} from "../login/login";
import {Customer} from "../../entities/customer";
import {CustomerDetailsPage} from "../customer-details/customer-details";
import {Pro} from "../../entities/pro";
import {ProDetailsPage} from "../pro-details/pro-details";
import {BidsPage} from "../bids/bids";
import {Bid} from "../../entities/bid";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [AuthService]
})
export class JobDetailsPage {

  selectedJob: Job;
  prosBid: Bid;
  currentTab: string;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private app: App) {
    this.selectedJob = params.get("job");
    if (this.navCtrl.parent && this.navCtrl.parent.getSelected()) {
      this.currentTab = this.navCtrl.parent.getSelected().tabTitle;
    }

    if (params.get("bid")) {
      this.prosBid = params.get("bid");
    }
  }

  ionViewCanEnter(): Promise<boolean> {
    return new  Promise((resolve, reject) => {
      this.authService.loggedIn()
        .then((data) => {
          if (data) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  private editBid(bid: Bid) {
    console.log("Editing bid");
  }

  private viewBids(jobId: number) {
    if (jobId) {
      this.navCtrl.push(BidsPage, {jobId: jobId}).catch(() => {
        this.authService.logout()
          .then(() => this.app.getRootNav().setRoot(LoginPage));
      });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private markJobComplete(jobId: number) {
    console.log("Completing job");
  }

  private viewCustomerDetails(customer: Customer) {
    if (customer) {
        this.navCtrl.push(CustomerDetailsPage, {customer: customer}).catch(() => {
          this.authService.logout()
            .then(() => this.app.getRootNav().setRoot(LoginPage));
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private viewProDetails(pro: Pro) {
    if (pro) {
      this.navCtrl.push(ProDetailsPage, {pro: pro})
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
