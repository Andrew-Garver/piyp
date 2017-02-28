import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {LoginPage} from "../../login/login";

@Component({
  selector: 'page-profile-dob-form',
  templateUrl: 'dob.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class ProfileDOBForm {
  private dobForm: FormGroup;
  private formIsValid: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService) {
    this.formIsValid = true;

    // let dobObj = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity.dob;
    // // this.dob = (dobObj.year && dobObj.month && dobObj.day) ? dobObj.year + "-" + dobObj.month + "-" + dobObj.day : '';

    //TODO: WTF???
    // console.log(new Date("1997-1-1")); // null
    // console.log(new Date("1999-12-31")); // "1999-12-31T00:00:00.000Z"
    // console.log(new Date("2010-11-7")); // null
    // console.log(new Date("1992-4-21")); // null
    // console.log(new Date("1842-2-27")); // null
    // console.log(new Date("2000-8-20")); // null

    this.dobForm = formBuilder.group({
      dob: ['', Validators.required]
    });
  }

  nextPage() {
    if (this.dobForm.valid) {
      this.loadingService.presentLoading();
      this.formIsValid = true;
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          console.log(localStorage);
          this.navCtrl.push(ProfilePersonalAddressForm)
            .catch(() => {
              this.authService.logout()
                .then(() => {
                  this.navCtrl.setRoot(LoginPage);
                  this.toastService.presentToast("Your session has expired. Please login again.");
                });
            });
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
    else {
      this.formIsValid = false;
    }
  }

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    console.log("profile di " + profileId);
    let dobParts = this.dobForm.value.dob.split("-");
    let dob = {
      "year": dobParts[0],
      "month": dobParts[1],
      "day": dobParts[2]
    };
    return this.profileService.updateUserProfile(profileId, {dob: dob});
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
