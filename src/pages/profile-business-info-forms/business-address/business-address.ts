import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {LoginPage} from "../../login/login";
import {PhoneNumberPage} from "../../phone-number/phone-number";

@Component({
  selector: 'page-business-address-form',
  templateUrl: 'business-address.html'
})
export class BusinessAddressForm {
  private businessAddressForm: FormGroup;

  private zipCodeIsValid: boolean;
  private formFieldsMissing: boolean;
  private business: any;
  private edit: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {
    this.zipCodeIsValid = true;
    this.edit = this.navParams.get('edit');
    this.business = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity;

    this.businessAddressForm = formBuilder.group({
      addressLine1: [this.business.address ? this.business.address.line1 : '', Validators.required],
      addressLine2: [this.business.address ? this.business.address.line2 : ''],
      state: [this.business.address ? this.business.address.state : '', Validators.required],
      city: [this.business.address ? this.business.address.city : '', Validators.required],
      zipCode: [this.business.address ? this.business.address.postal_code : '', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null]
    });
  }

  nextForm() {
    if (this.businessAddressForm.valid) {
      this.formFieldsMissing = false;
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          if (this.edit) {
            this.navCtrl.pop()
              .catch(() => {
                this.logout();
              });
          }
          else {
            this.navCtrl.push(PhoneNumberPage)
              .catch(() => {
                this.logout();
              });
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
      "line1": this.businessAddressForm.value.addressLine1,
      "line2": this.businessAddressForm.value.addressLine2,
      "city": this.businessAddressForm.value.city,
      "state": this.businessAddressForm.value.state,
      "postalCode": this.businessAddressForm.value.zipCode
    };
    return this.profileService.updateUserProfile(profileId, {
      businessAddress: address
    });
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

  logout() {
    this.authService.logout()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
        this.toastService.presentToast("Your session has expired. Please login again.");
      });
  }
}
