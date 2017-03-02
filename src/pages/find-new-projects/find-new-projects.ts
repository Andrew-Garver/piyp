import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {FormBuilder} from "@angular/forms";
import {Geolocation} from "ionic-native";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";
import {ProfileService} from "../../services/profile.service";
import {JobService} from "../../services/job.service";
import {JobDetailsPage} from "../job-details/job-details";
import {ErrorPage} from "../error/error";

@Component({
  selector: 'page-find-new-projects',
  templateUrl: 'find-new-projects.html'
})
export class FindNewProjectsPage {

  private currentProfile: any;
  private services: any;
  private segment: string = "projectsAll";
  private allProjects: any;
  private watchedProjects: any;
  private filters: any = {};

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private authService: AuthService, private loadingService: LoadingService,
              private toastService: ToastService, private profileService: ProfileService,
              private jobService: JobService) {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.services = this.currentProfile.registeredServices;

    let serviceString = "";
    for (let service of this.services) {
      serviceString += service._id + ",";
    }
    serviceString = serviceString.slice(0, -1);

    this.filters = {
      profile: this.currentProfile._id,
      services: serviceString,
      locType: "business",
      radius: 100,
      queryBy: "radius"
    };
  }

  ionViewDidEnter() {
    this.fetchProjectData();
  }

  fetchProjectData() {
    return new Promise((resolve, reject) => {
      if (this.filters.locType === "current") {
        Geolocation.getCurrentPosition()
          .then((position) => {
            this.filters['lat'] = position.coords.latitude;
            this.filters['lon'] = position.coords.longitude;
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
            reject(err);
          });
      }
      else {
        resolve(true);
      }
    })
      .then(() => {
        this.jobService.getJobs(this.filters)
          .then((jobs) => {
            if (jobs) {
              console.log(jobs);
              if (this.segment === "projectsAll") {
                // this.allProjects = jobs.filter((job) => {
                //   return job.bids.length === 0 && !job.acceptedBid;
                // });
                this.allProjects = jobs;
              }
              else {
                this.allProjects = jobs.filter((job) => {
                  // return job.watching
                })
              }
            }
          })
          .catch((err) => {
            console.log(err);
            this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
          });
      })
  }

  private viewJobDetails(selectedJob) {
    if (selectedJob) {
      this.navCtrl.push(JobDetailsPage, {job: selectedJob})
        .catch((err) => {
          this.authService.logout()
            .then(() => {
              this.navCtrl.setRoot(LoginPage);
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
