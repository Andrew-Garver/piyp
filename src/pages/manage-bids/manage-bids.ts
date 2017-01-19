import {Component, OnInit} from '@angular/core';

import {DatabaseService} from "../../services/database.service";
import {NavController, App} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {Bid} from "../../entities/bid";
import {LoginPage} from "../login/login";
import {JobDetailsPage} from "../job-details/job-details";
import {Job} from "../../entities/job";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-manage-bids',
  templateUrl: 'manage-bids.html',
  providers: [DatabaseService]
})

export class ManageBidsPage implements OnInit{

  bids: Bid[];
  userId: number;

  constructor(private databaseService: DatabaseService, private navCtrl: NavController,
              private authService: AuthService, private app: App) {
    this.userId = JSON.parse(localStorage.getItem("current_user")).id;
  }

  ngOnInit() {
    this.databaseService.getOpenBidsByProId(this.userId)
      .then((bids) => this.bids = bids);
  }

  private viewJobDetails(bid: Bid) {
    if (bid) {
      this.navCtrl.push(JobDetailsPage, {job: bid.job, bid: bid})
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
