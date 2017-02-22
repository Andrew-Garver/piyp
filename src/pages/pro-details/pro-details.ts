import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {Pro} from "../../entities/pro";

@Component({
  selector: 'page-pro-details',
  templateUrl: 'pro-details.html',
  providers: [AuthService]
})

export class ProDetailsPage {

  private businessInfo: any;
  private avgRating: number;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.businessInfo = params.get("businessInfo");
    console.log(this.businessInfo);
  }

  ionViewWillEnter() {
    this.avgRating = this.getAverageRating();
  }

  ionViewCanEnter(): Promise<boolean> {
    return new  Promise((resolve, reject) => {
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
