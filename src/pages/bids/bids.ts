import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, App} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {Bid} from "../../entities/bid";
import {DatabaseService} from "../../services/database.service";
import {BidDetailsPage} from "../bid-details/bid-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {ToastService} from "../../services/toast.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-bids',
  templateUrl: 'bids.html',
  providers: [AuthService, ToastService, ProfileService]
})

export class BidsPage {

  private bids: any;
  private selectedJob: any;
  private bidderInfo: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService, private toastService: ToastService) {
    this.bids = params.get('bids');
    this.selectedJob = params.get('job');
    this.bidderInfo = this.bids[0]._creator.profiles[0];
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

  viewBidDetails(bid) {
    this.navCtrl.push(BidDetailsPage, {job: this.selectedJob, bid: bid})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
          });
      });
  }

}
