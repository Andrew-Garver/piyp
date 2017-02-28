import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {BidService} from "../../services/bid.service";
import {ManageBidsPage} from "../manage-bids/manage-bids";

@Component({
  selector: 'page-place-bid',
  templateUrl: 'place-bid.html',
})

export class PlaceBidPage {

  private formBidAmount: FormGroup;
  private selectedJob: any;
  private edit: boolean;

  constructor(private navCtrl: NavController, private bidService: BidService,
              private navParams: NavParams, private formBuilder: FormBuilder,
              private loadingService: LoadingService, private toastService: ToastService) {
    this.selectedJob = this.navParams.get('job');
    this.edit = this.navParams.get('edit');

    this.formBidAmount = formBuilder.group({
      bidAmount: [this.edit ? this.selectedJob.bids[0].amount : '', Validators.required],
      message: [this.edit ? this.selectedJob.bids[0].message : '', Validators.required],
    });
  }

  placeBid() {
    if (this.formBidAmount.valid) {
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.push(ManageBidsPage);
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
