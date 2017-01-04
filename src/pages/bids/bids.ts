import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth/auth.service";
import {Bid} from "../../entities/bids";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'page-bids',
  templateUrl: 'bids.html',
  providers: [AuthService, DatabaseService]
})

export class BidsPage implements OnInit {

  private openBids: Bid[];
  private numBids: number;
  private jobId: number;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService, private databaseService: DatabaseService) {
    this.jobId = this.params.get('jobId');
  }

  ngOnInit() {
    if (this.jobId) {
      this.databaseService.getBidsByJobId(this.jobId)
        .then((bids) => {
        this.openBids = bids;
        console.log(this.openBids.length);
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
    console.log("viewing details for " + bidId);
  }

}
