import {Component} from '@angular/core';

import {Job} from "../../entities/job";
import {JobDetailsPage} from "../job-details/job-details";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {AuthService} from "../../services/auth.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'page-my-projects',
  templateUrl: 'my-projects.html'
})

export class MyProjectsPage {

  private currentProfile: any;
  private jobsListed: any;
  private jobsContracted: any;
  private jobsCompleted: any;
  private segment: any = "jobsListed";
  // private projectImages: any;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private jobService: JobService, private loadingService: LoadingService,
              private toastService: ToastService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
  }

  ionViewWillEnter() {
    this.fetchJobData();
  }

  fetchJobData() {
    let params = {
      profile: this.currentProfile._id,
      queryBy: 'creator'
    };

    this.loadingService.presentLoading();
    this.jobService.getJobs(params)
      .then((jobs) => {
      console.log(jobs);
        // this.jobsListed = jobs.filter((job) => {
        //   return !job.proLeftFeedback;
        // });
        // this.jobsCompleted = jobs.filter((job) => {
        //   return job.proLeftFeedback;
        // });
        // console.log(this.jobsListed);
        this.loadingService.hideLoading();
        this.jobsListed = jobs;
        return Promise.resolve(jobs);
      })
      // .then((jobs) => {
      //   return this.jobService.getProjectImages(jobs);
      // })
      // .then((images) => {
      //   this.loadingService.hideLoading();
      //   this.projectImages = images;
      //   console.log(this.projectImages);
      // })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log(err);
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  private viewJobDetails(job) {
    if (job) {
      this.navCtrl.push(JobDetailsPage, {job: job})
        .catch(() => {
          this.authService.logout()
            .then(() => {
              this.app.getRootNav().setRoot(LoginPage);
              this.toastService.presentToast("Your session has expired. Please login again.");
            });
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
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
}
