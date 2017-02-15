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

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
  providers: [AuthService, ToastService, JobService, LoadingService]
})
export class JobDetailsPage {

  private selectedJob: any;
  private prosBid: any;
  private currentProfile: any;
  private questions: any;
  private winningBid: any;

  constructor(public navCtrl: NavController, private authService: AuthService,
              private params: NavParams, private app: App, private toastService: ToastService,
              private jobService: JobService, private loadingService: LoadingService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.selectedJob = this.params.get("job");

    if (params.get("bid")) {
      this.prosBid = params.get("bid");
    }
  }

  ionViewWillEnter() {
    console.log(this.selectedJob);
    // TODO: Pull questions and answers from job obj
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

  private deleteBid(bid) {
    console.log("Editing bid");
  }

  private deleteJob() {
    this.jobService.confirmDelete(this.selectedJob._id)
        .then((data) => {
          if (data) {
            this.navCtrl.setRoot(JobRequestsPage);
          }
        })
        .catch(() => {
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

  private editBid(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(PlaceBidPage, {job: selectedJob, edit: true})
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
      this.navCtrl.push(BidsPage, {job: selectedJob})
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
    this.navCtrl.push(CustomerDetailsPage, {customer: this.selectedJob._creator})
        .catch(() => {
          this.authService.logout()
              .then(() => {
                this.logout();
              });
        });
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
