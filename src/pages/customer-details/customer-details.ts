import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {Customer} from "../../entities/customer";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
  providers: [AuthService]
})

export class CustomerDetailsPage {

  private consumer: any;
  private consumerProfile: any;
  private avgRating: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.consumer = params.get("consumerInfo");
    this.consumerProfile = this.consumer.profiles[0];
    console.log(this.consumer)
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
    if (!this.consumerProfile.reviews) {
      return 0;
    }

    let avgRating = 0;
    let totalReviews = 0;
    for (let i = 0; i < this.consumerProfile.reviews.length; i++) {
      avgRating += this.consumerProfile.reviews[i].rating;
      totalReviews++;
    }

    return avgRating / totalReviews;
  }

}
