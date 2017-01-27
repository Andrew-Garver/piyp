import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {BusinessServicesForm} from "../business-services/business-services";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {LoginPage} from "../../login/login";

@Component({
  selector: 'page-business-address-form',
  templateUrl: 'business-address.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class BusinessAddressForm {
  private businessAddressForm: FormGroup;

  private zipCodeIsValid: boolean;
  private formFieldsMissing: boolean;
  private businessType: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService) {
    this.zipCodeIsValid = true;
    this.businessType = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity.type;

    this.businessAddressForm = formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null],
      businessTaxId: ['', Validators.required]
    });
  }

  nextForm() {
    if (this.businessAddressForm.valid) {
      this.formFieldsMissing = false;
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          this.navCtrl.push(BusinessServicesForm)
            .catch(() => {
              this.authService.logout();
              this.navCtrl.setRoot(LoginPage);
              this.toastService.presentToast("Your session has expired. Please login again.");
            });
        })
        .catch((err) => {
          console.log(err);
          this.loadingService.hideLoading();
          this.navCtrl.setRoot(ProfilePage);
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

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
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
      businessAddress: address,
      businessTaxId: this.businessAddressForm.value.businessTaxId
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
}
