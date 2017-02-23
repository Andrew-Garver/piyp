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
import {RequestJobFormPage} from "../request-job-form/request-job-form";
import {JobService} from "../../services/job.service";
import {JobRequestsPage} from "../job-requests/job-requests";
import {QuestionDetailsPage} from "../../question-details/question-details";
import {AskQuestionFormPage} from "../ask-question-form/ask-question-form";
import {RateUserPage} from "../rate-user/rate-user";
import {LoadingService} from "../../services/loading.service";
import {BidService} from "../../services/bid.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [AuthService, ToastService, JobService, LoadingService, BidService, ProfileService]
})
export class JobDetailsPage {

  private selectedJob: any;
  private currentProfile: any;
  private questions: any;
  private totalQuestions: number;
  private winningBid: any;
  private historical: boolean;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private app: App, private toastService: ToastService,
              private jobService: JobService, private loadingService: LoadingService, private bidService: BidService,
              private profileService: ProfileService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.selectedJob = this.params.get("job");
    this.historical = this.params.get("historical");
  }

  ionViewWillEnter() {
    this.getQuestions();

    for (let bid of this.selectedJob.bids) {
      if (bid._id === this.selectedJob.acceptedBid) {
        this.winningBid = bid;
        break;
      }
    }
  }

  getQuestions() {
    this.questions = this.selectedJob.qa || [];
    this.totalQuestions = this.questions.length;
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

  private deleteBid() {
    this.bidService.deleteBid(this.selectedJob._id, this.selectedJob.bids[0]._id)
      .then((data) => {
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastService.presentToast("Could not delete job at this time. Please try again later.");
      });
  }

  private deleteJob() {
    this.jobService.confirmDelete(this.selectedJob._id)
      .then((data) => {
        if (data) {
          this.navCtrl.setRoot(JobRequestsPage);
        }
      })
      .catch((err) => {
        console.log(err);
        this.toastService.presentToast("Could not delete job at this time. Please try again later.");
      });
  }

  private placeBid(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(PlaceBidPage, {job: selectedJob})
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

  private viewBids(selectedJob) {
    if (selectedJob) {
      this.bidService.getBids(selectedJob._id)
        .then((bids) => {
          this.navCtrl.push(BidsPage, {job: this.selectedJob, bids: bids})
            .catch((err) => {
              console.log(err);
              this.toastService.presentToast("Could not reach PIYP servers. Please check your data connection and try again.");
            });
        })
        .catch((err) => {
          console.log("get bids bad");
          console.log(err);
          this.toastService.presentToast("Could not reach PIYP servers. Please check your data connection and try again.");
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

  private confirmJobComplete() {
    this.loadingService.presentLoading();
    this.jobService.consumerMarkJobComplete(this.selectedJob._id)
      .then((result) => {
        this.loadingService.hideLoading();
        this.leaveReview();
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        this.toastService.presentToast(err);
        console.log(err);
      });
  }

  private leaveReview() {
    this.navCtrl.push(RateUserPage, {jobId: this.selectedJob._id})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.logout();
          });
      });
  }

  private markJobComplete() {
    this.loadingService.presentLoading();
    this.jobService.proMarkJobComplete(this.selectedJob._id)
      .then((result) => {
        this.loadingService.hideLoading();
        this.navCtrl.pop();
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        this.toastService.presentToast(err);
        console.log(err);
      });
  }

  private viewCustomerDetails() {
    this.profileService.getUserPublicProfile(this.selectedJob._creator._id, {type: "consumer", hired: !!this.winningBid})
      .then((profile) => {
        this.navCtrl.push(CustomerDetailsPage, {consumerInfo: profile})
          .catch(() => {
            this.authService.logout()
              .then(() => {
                this.logout();
              });
          });
      })
      .catch((err) => {
        this.toastService.presentToast("Something went wrong getting the Consumer's information.");
        console.log(err);
      });
  }

  private viewBusinessCard(type) {
    this.profileService.getUserPublicProfile(this.winningBid._creator, {type: type})
      .then((profile) => {
        this.navCtrl.push(ProDetailsPage, {businessInfo: profile})
          .catch(() => {
            this.authService.logout()
              .then(() => {
                this.logout();
              });
          });
      })
      .catch((err) => {
        this.toastService.presentToast("Something went wrong getting the Pro's information.");
        console.log(err);
      });
  }

  viewQuestion(question) {
    console.log('viewing question:', question);
    this.navCtrl.push(QuestionDetailsPage, {question: question, job: this.selectedJob})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.logout();
          });
      });
  }

  askQuestion(jobId) {
    console.log('jobId:', this.selectedJob._id);
    this.navCtrl.push(AskQuestionFormPage, {job: this.selectedJob})
      .catch(() => {
        this.authService.logout()
          .then(() => {
            this.logout();
          });
      });
  }

  filterQuestions(ev: any) {
    // Reset items back to all of the items
    this.getQuestions();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.questions = this.questions.filter((question) => {
        return (question.question.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  determineClass() {
    if (this.currentProfile.type === 'pro') {
      if (!this.selectedJob.acceptedBid) { // Not hired
        if (this.selectedJob.bids) { // placed a bid
          return "page-content-76";
        }
        else { // not yet placed a bid
          return "page-content-78";
        }
      }
      else { // Hired
        return "page-content-66";
      }
    }
    else if (this.currentProfile.type === 'consumer' && !this.selectedJob.acceptedBid) {
      return "page-content-76"
    }
    else {
      return "page-content-66";
    }
  }

  logout() {
    this.app.getRootNav().setRoot(LoginPage);
    this.toastService.presentToast("Your session has expired. Please login again.");
  }

}
