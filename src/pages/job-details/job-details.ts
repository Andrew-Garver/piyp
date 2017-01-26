import {Component} from '@angular/core';

import {NavController, NavParams, App} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {ErrorPage} from "../error/error";
import {LoginPage} from "../login/login";
import {CustomerDetailsPage} from "../customer-details/customer-details";
import {Pro} from "../../entities/pro";
import {ProDetailsPage} from "../pro-details/pro-details";
import {BidsPage} from "../bids/bids";
import {ToastService} from "../../services/toast.service";
import {PlaceBidPage} from "../place-bid/place-bid";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [AuthService, ToastService]
})
export class JobDetailsPage {

  private selectedJob: any;
  private prosBid: any;
  private currentTab: string;
  private currentProfile: any;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private app: App, private toastService: ToastService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.selectedJob = params.get("job");
    if (this.navCtrl.parent && this.navCtrl.parent.getSelected()) {
      this.currentTab = this.navCtrl.parent.getSelected().tabTitle;
    }

    if (params.get("bid")) {
      this.prosBid = params.get("bid");
    }
  }

  // ionViewCanEnter(): Promise<boolean> {
  //   return new  Promise((resolve, reject) => {
  //     this.authService.loggedIn()
  //       .then((data) => {
  //       console.log("returning");
  //       console.log(data);
  //         if (data) {
  //           resolve(true);
  //         }
  //         else {
  //           resolve(false);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         reject(err);
  //       });
  //   });
  // }

  private editBid(bid) {
    console.log("Editing bid");
  }

  private placeBid(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(PlaceBidPage, {job: selectedJob}).catch(() => {
        this.authService.logout()
          .then(() => {
            this.logout();
          });
      });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private viewBids(jobId: number) {
    if (jobId) {
      this.navCtrl.push(BidsPage, {jobId: jobId}).catch(() => {
        this.authService.logout()
          .then(() => {
            this.logout();
          });
      });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private markJobComplete(jobId: number) {
    console.log("Completing job");
  }

  private viewCustomerDetails(customer) {
    if (customer) {
        this.navCtrl.push(CustomerDetailsPage, {customer: customer}).catch(() => {
          this.authService.logout()
            .then(() => {
              this.logout();
            });
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
          this.authService.logout()
            .then(() => {
              this.logout();
            });
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  logout() {
    this.app.getRootNav().setRoot(LoginPage);
    this.toastService.presentToast("Your session has expired. Please login again.");
  }

}
