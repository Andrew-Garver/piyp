import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {ProfilePage} from "../../profile/profile";
import {LoadingService} from "../../../services/loading.service";
import {LoginPage} from "../../login/login";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {ServicesService} from "../../../services/services.service";
import {filter} from "rxjs/operator/filter";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'page-business-services',
  templateUrl: 'business-services.html',
  providers: [LoadingService, AuthService, ToastService, ServicesService, ProfileService]
})
export class BusinessServicesForm {
  private services: any;
  private noServicesSelected: boolean = false;

  constructor(public navCtrl: NavController, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private servicesService: ServicesService, private profileService: ProfileService) {
  }

  ionViewWillEnter() {
    this.loadingService.presentLoading();
    this.servicesService.getServices()
      .then((services) => {
        this.loadingService.hideLoading();
        this.services = services;
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
      });
  }

  finishForms() {
    let filteredServices = this.services.filter(s => s.checked == true);
    if (filteredServices.length > 0) {
      this.noServicesSelected = false;
      this.loadingService.presentLoading();

      let serviceArray = [];
      for (let service of filteredServices) {
        serviceArray.push(service._id);
      }

      let data = {
        registeredServices: serviceArray
      };

      this.postData(data)
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
    else {
      this.noServicesSelected = true;
    }
  }

  saveAndQuit() {
    // this.postData()
    //   .then(() => {
    //     this.navCtrl.setRoot(ProfilePage);
    //   });
  }

  postData(data): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    return this.profileService.updateUserProfile(profileId, data);
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
