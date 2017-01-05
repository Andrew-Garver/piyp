import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, App} from "ionic-angular";
import {AuthService} from "../../services/auth/auth.service";
import {Bid} from "../../entities/bid";
import {DatabaseService} from "../../services/database.service";
import {BidDetailsPage} from "../bid-details/bid-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-bids',
  templateUrl: 'bids.html',
  providers: [AuthService, DatabaseService]
})

export class BidsPage implements OnInit {

  private openBids: Bid[];
  private numBids: number;
  private jobId: number;
  private isPro: boolean;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService, private databaseService: DatabaseService,
              private app: App) {
    this.jobId = this.params.get('jobId');
    if (JSON.parse(localStorage.getItem("current_user")).isPro) {
      this.isPro = true;
    }
    else {
      this.isPro = false;
    }
  }

  ngOnInit() {
    if (this.jobId) {
      this.databaseService.getBidsByJobId(this.jobId)
        .then((bids) => {
          this.openBids = bids;
          this.numBids = bids.length;
        });
    }
  }

  ionViewCanEnter(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

  viewBidDetails(bidId: number) {
    if (bidId > 0) {
      this.navCtrl.push(BidDetailsPage, {bidId: bidId}).catch(() => {
        this.authService.logout();
        this.app.getRootNav().setRoot(LoginPage);
      });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

}
