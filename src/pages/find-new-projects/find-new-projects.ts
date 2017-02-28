import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Geolocation} from "ionic-native";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {NearbyJobsPage} from "../nearby-jobs/nearby-jobs";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";
import {ServicesService} from "../../services/services.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-find-new-projects',
  templateUrl: 'find-new-projects.html'
})
export class FindNewProjectsPage {

  private formFindJobs: FormGroup;
  private currentProfile: any;
  private services: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private authService: AuthService, private loadingService: LoadingService,
              private toastService: ToastService, private profileService: ProfileService) {
    this.formFindJobs = formBuilder.group({
      radius: ['', Validators.required],
      locType: ['', Validators.required],
      serviceCategories: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.services = this.currentProfile.registeredServices;
  }

  searchForOpenJobs() {
    if (this.formFindJobs.valid) {
      this.loadingService.presentLoading();
      if (this.formFindJobs.value.locType === "current") {
        Geolocation.getCurrentPosition()
          .then((position) => {
            this.loadingService.hideLoading();
            let params = this.getParams(position);
            this.navCtrl.push(NearbyJobsPage, {params: params})
              .catch(() => {
                this.logout();
              });
          })
          .catch((err) => {
            this.loadingService.hideLoading();
            console.log(err);
            this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
          });
      }
      else {
        this.loadingService.hideLoading();
        let params = this.getParams(null);
        this.navCtrl.push(NearbyJobsPage, {params: params})
          .catch(() => {
            this.logout();
          });
      }
    }
  }

  getParams(position) {
    let jobParams = {
      profile: this.currentProfile._id,
      services: this.formFindJobs.value.serviceCategories,
      locType: this.formFindJobs.value.locType,
      radius: this.formFindJobs.value.radius
    };

    if (position) {
      jobParams['lat'] = position.coords.latitude;
      jobParams['lon'] = position.coords.longitude;
    }

    return jobParams;
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
        this.toastService.presentToast("Your session has expired. Please login again.");
      });
  }

}
