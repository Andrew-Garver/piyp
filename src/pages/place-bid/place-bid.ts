import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ManageBidsPage} from "../manage-bids/manage-bids";
import {LoginPage} from "../login/login";
import {ToastService} from "../../services/toast.service";
import {BidService} from "../../services/bid.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-place-bid',
  templateUrl: 'place-bid.html',
  providers: [AuthService, LoadingService, ToastService, BidService]
})

export class PlaceBidPage {

  private formBidAmount: FormGroup;
  private selectedJob: any;

  constructor(private navCtrl: NavController, private authService: AuthService,
              private navParams: NavParams, private formBuilder: FormBuilder,
              private loadingService: LoadingService, private toastService: ToastService,
              private bidService: BidService) {
    this.selectedJob = this.navParams.get('job');

    this.formBidAmount = formBuilder.group({
      bidAmount: ['', Validators.required],
      message: [''],
    });
  }

  placeBid() {
    if (this.formBidAmount.valid) {
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.parent.select(2);
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
  }

  postData(): Promise<any> {
    let bid = {
      amount: this.formBidAmount.value.bidAmount,
      message: this.formBidAmount.value.message,
    };
    return this.bidService.placeBid(this.selectedJob._id, bid);
  }

}
