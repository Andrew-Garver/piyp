import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {LoginPage} from "../../login/login";
import {BusinessAddressForm} from "../business-address/business-address";

@Component({
  selector: 'page-business-name-form',
  templateUrl: 'business-name.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class BusinessNameForm {

  private businessNameForm: FormGroup;
  private formFieldsMissing: boolean = false;
  private edit: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {
    this.edit = this.navParams.get('edit');
    let businessName = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity.business_name;

    this.businessNameForm = formBuilder.group({
      businessName: [businessName, Validators.required],
    });
  }

  nextForm() {
    if (!this.businessNameForm.valid) {
      this.formFieldsMissing = true;
    }
    else {
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
            this.navCtrl.push(BusinessAddressForm)
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

  postData(): Promise<any> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let params = {
      businessName: this.businessNameForm.value.businessName,
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
    this.authService.logout()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
        this.toastService.presentToast("Your session has expired. Please login again.");
      });
  }
}
