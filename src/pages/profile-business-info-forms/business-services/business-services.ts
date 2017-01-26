import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {ProfilePage} from "../../profile/profile";
import {LoadingService} from "../../../services/loading.service";
import {LoginPage} from "../../login/login";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'page-business-services',
  templateUrl: 'business-services.html',
  providers: [LoadingService, AuthService, ToastService]
})
export class BusinessServicesForm {
  private services: any;
  private noServicesSelected: boolean = false;

  constructor(public navCtrl: NavController, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService) {
    this.services = [
      {category: "Auto Glass"},
      {category: "HVAC"},
      {category: "Landscaping"},
      {category: "Pool Maintenance"},
      {category: "Tech Support"}
    ]
  }

  finishForms() {
    if (this.services.filter(s => s.checked == true).length > 0) {
      this.noServicesSelected = false;
      this.loadingService.presentLoading();
      this.postData()
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
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
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
