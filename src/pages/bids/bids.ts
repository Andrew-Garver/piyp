import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, App} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {Bid} from "../../entities/bid";
import {DatabaseService} from "../../services/database.service";
import {BidDetailsPage} from "../bid-details/bid-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-bids',
  templateUrl: 'bids.html',
  providers: [AuthService, ToastService]
})

export class BidsPage {

  private selectedJob: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService, private app: App,
  private toastService: ToastService) {
    this.selectedJob = params.get('job');
  }

  ionViewWillEnter() {

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

  viewBidDetails() {
      this.navCtrl.push(BidDetailsPage, {job: this.selectedJob})
        .catch(() => {
          this.authService.logout()
            .then(() => {
              this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
            });
        });
    }

}
