import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastService} from "../../../services/toast.service";
import {AuthService} from "../../../services/auth.service";
import {LoginPage} from "../../login/login";
import {PhoneNumberPage} from "../../phone-number/phone-number";
import {ProfilePage} from "../../profile/profile";

@Component({
  selector: 'page-profile-personal-address-form',
  templateUrl: 'address.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class ProfilePersonalAddressForm {
  private addressForm: FormGroup;
  private zipCodeIsValid: boolean;
  private formFieldsMissing: boolean;
  private edit: boolean;
  private currentProfile: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {
    this.zipCodeIsValid = true;

    this.edit = this.navParams.get('edit');
    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));
    let personalAddress = this.currentProfile.personalAddress;
    let addressLine1, addressLine2, state, city, zipCode;

    if (personalAddress) {
      addressLine1 = personalAddress.line1;
      addressLine2 = personalAddress.line2;
      state = personalAddress.state;
      city = personalAddress.city;
      zipCode = personalAddress.postalCode;
    }

    this.addressForm = formBuilder.group({
      addressLine1: [addressLine1, Validators.required],
      addressLine2: [addressLine2],
      state: [state, Validators.required],
      city: [city, Validators.required],
      zipCode: [zipCode, Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null]
    });
  }

  nextPage() {
    if (this.addressForm.valid) {
      this.loadingService.presentLoading();
      this.formFieldsMissing = false;
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
              this.navCtrl.push(PhoneNumberPage);
            }
            else {
              this.navCtrl.setRoot(ProfilePage);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
    else {
      this.formFieldsMissing = true;
    }
  }

  checkZip(zip) {
    if (zip != undefined && zip.length != 5) {
      this.zipCodeIsValid = false;
    }
    else {
      this.zipCodeIsValid = true;
    }
  }

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let address = {
      "line1": this.addressForm.value.addressLine1,
      "line2": this.addressForm.value.addressLine2,
      "city": this.addressForm.value.city,
      "state": this.addressForm.value.state,
      "postalCode": this.addressForm.value.zipCode
    };
    return this.profileService.updateUserProfile(profileId, {personalAddress: address});
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
