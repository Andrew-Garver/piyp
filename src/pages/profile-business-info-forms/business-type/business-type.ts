import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {BusinessAddressForm} from "../business-address/business-address";
import {BusinessServicesForm} from "../business-services/business-services";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {LoginPage} from "../../login/login";
import {BusinessNameForm} from "../business-name/business-name";

@Component({
  selector: 'page-business-type-form',
  templateUrl: 'business-type.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class BusinessTypeForm {
  private businessTypeForm: FormGroup;

  private formFieldsMissing: boolean = false;
  private authorizedRep: boolean = true;
  private ssnIsValid: boolean = true;
  private edit: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {
    this.edit = this.navParams.get('edit');
    let businessInfo = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity;

    this.businessTypeForm = formBuilder.group({
      businessType: [businessInfo.type, Validators.required],
      authorizedRep: [null],
      ssnLast4: ['', Validators.pattern('^[0-9]*$')],
    });
  }

  nextForm() {
    this.checkAuthority();
    this.checkSSN();
    if (!this.businessTypeForm.valid) {
      this.formFieldsMissing = true;
    }
    else if (this.businessTypeForm.value.businessType === "company" && !this.businessTypeForm.value.authorizedRep) {
      this.formFieldsMissing = false;
      this.authorizedRep = false;
    }
    else if (this.ssnIsValid) {
      this.formFieldsMissing = false;
      this.authorizedRep = true;
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
          this.loadingService.hideLoading();
          if (this.edit) {
           this.navCtrl.pop();
          }
          else {
            this.navCtrl.push(this.businessTypeForm.value.businessType === 'company' ? BusinessNameForm : BusinessAddressForm)
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
  }

  checkAuthority() {
    this.authorizedRep = !(this.businessTypeForm.value.businessType === "company" && !this.businessTypeForm.value.authorizedRep);
  }

  checkSSN() {
    this.ssnIsValid = !(this.businessTypeForm.value.businessType === "individual" && this.businessTypeForm.value.ssnLast4.length !== 4);
  }

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let params = {
      businessType: this.businessTypeForm.value.businessType,
      ssnLast4: this.businessTypeForm.value.ssnLast4
    };
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

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
    this.toastService.presentToast("Your session has expired. Please login again.");
  }
}
