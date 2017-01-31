import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, App} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {DatabaseService} from "../../services/database.service";
import {ErrorPage} from "../error/error";
import {LoginPage} from "../login/login";
import {Customer} from "../../entities/customer";
import {CustomerDetailsPage} from "../customer-details/customer-details";
import {Pro} from "../../entities/pro";
import {ProDetailsPage} from "../pro-details/pro-details";
import {Bid} from "../../entities/bid";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-bid-details',
  templateUrl: 'bid-details.html',
  providers: [AuthService, ToastService, LoadingService, JobService]
})
export class BidDetailsPage {

  selectedJob: any;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private loadingService: LoadingService,
              private toastService: ToastService, private jobService: JobService) {
    this.selectedJob = params.get('job');
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
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

  private acceptBid() {
    this.loadingService.presentLoading();
    this.postData()
      .then(() => {
        this.loadingService.hideLoading();
        this.navCtrl.popToRoot();
        this.navCtrl.parent.select(2);
      })
      .catch((err) => {
        console.log(err);
        this.loadingService.hideLoading();
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  postData(): Promise<any> {
    let jobId = this.selectedJob._id;
    let params = {
      acceptedBidId: this.selectedJob.bids[0]._id
    };
    return this.jobService.acceptBid(jobId, params);
  }
}
