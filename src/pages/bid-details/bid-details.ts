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

@Component({
  selector: 'page-bid-details',
  templateUrl: 'bid-details.html',
  providers: [AuthService, DatabaseService]
})
export class BidDetailsPage implements OnInit {

  selectedBid: Bid;
  isConsumer: boolean;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private app: App,
              private databaseService: DatabaseService) {
    if (JSON.parse(localStorage.getItem("current_user")).isConsumer) {
      this.isConsumer = true;
    }
    else {
      this.isConsumer = false;
    }
  }

  ngOnInit() {
    let bidId = this.params.get("bidId");
    if (bidId) {
      this.databaseService.getBidById(bidId)
        .then((bid) => {
        this.selectedBid = bid;
        });
    }
  }

  ionViewCanEnter(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

  private acceptBid(bid: Bid) {
    console.log("Accepting bid");
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(2);
  }

  private viewCustomerDetails(customer: Customer) {
    if (customer) {
      this.navCtrl.push(CustomerDetailsPage, {customer: customer}).catch(() => {
        this.authService.logout();
        this.app.getRootNav().setRoot(LoginPage);
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
          this.authService.logout();
          this.app.getRootNav().setRoot(LoginPage);
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

}
