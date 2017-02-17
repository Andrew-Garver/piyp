import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";
import {BusinessServicesForm} from "../profile-business-info-forms/business-services/business-services";
import {BusinessTaxIdForm} from "../profile-business-info-forms/business-tax-id/business-tax-id";

@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class PhoneNumberPage {
  private phoneNumberForm: FormGroup;
  private currentProfile: any;
  private edit: boolean;
  private business: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {

    this.edit = this.navParams.get('edit');
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    this.business = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity;
    let phoneNumber = JSON.parse(localStorage.getItem('current_profile'))[this.currentProfile.type === 'consumer' ? "personalPhone" : "businessPhone"];

    this.phoneNumberForm = formBuilder.group({
      phoneNumber: [phoneNumber, Validators.required],
    });
  }

  finishForm() {
    if (this.phoneNumberForm.valid) {
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          if (this.edit) {
            this.navCtrl.pop()
              .catch(() => {
                this.authService.logout()
                  .then(() => {
                    this.navCtrl.setRoot(LoginPage);
                    this.toastService.presentToast("Your session has expired. Please login again.");
                  });
              });
          }
          else {
            if (this.currentProfile.type === 'consumer') {
              this.navCtrl.setRoot(ProfilePage);
            }
            else {
              this.navCtrl.push(this.business.type === 'individual' ? BusinessServicesForm : BusinessTaxIdForm)
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
  }

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let params = {};
    if (this.currentProfile.type === "consumer") {
      params["personalPhone"] = this.phoneNumberForm.value.phoneNumber;
    }
    else {
      params["businessPhone"] = this.phoneNumberForm.value.phoneNumber;
    }

    return this.profileService.updateUserProfile(profileId, params);
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
