import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-bid-details',
  templateUrl: 'bid-details.html',
  providers: [AuthService, ToastService, LoadingService, JobService]
})
export class BidDetailsPage {

  private selectedJob: any;
  private selectedBid: any;
  private businessInfo: any;
  private rating: number;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private loadingService: LoadingService,
              private toastService: ToastService, private jobService: JobService) {
    this.selectedJob = params.get('job');
    this.selectedBid = params.get('bid');
    this.businessInfo = this.selectedBid._creator.profiles[0];

    console.log(this.selectedBid);
  }

  ionViewWillEnter() {
    this.rating = this.getAverageRating();
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

  getAverageRating() {
    if (!this.businessInfo.reviews) {
      return 0;
    }

    let avgRating = 0;
    let totalReviews = 0;
    for (let i = 0; i < this.businessInfo.reviews.length; i++) {
      avgRating += this.businessInfo.reviews[i].rating;
      totalReviews++;
    }

    return avgRating / totalReviews;
  }
}
