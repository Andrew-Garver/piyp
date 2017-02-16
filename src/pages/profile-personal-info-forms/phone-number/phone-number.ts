import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {ProfileService} from "../../../services/profile.service";
import {LoadingService} from "../../../services/loading.service";
import {ToastService} from "../../../services/toast.service";
import {AuthService} from "../../../services/auth.service";
import {LoginPage} from "../../login/login";

@Component({
  selector: 'page-phone-number',
  templateUrl: 'phone-number.html',
  providers: [ProfileService, LoadingService, AuthService, ToastService]
})
export class PhoneNumberPage {
  private phoneNumberForm: FormGroup;
  private edit: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService,
              private navParams: NavParams) {

    this.edit = this.navParams.get('edit');
    //TODO: prepopulate phone number, if exists.

    this.phoneNumberForm = formBuilder.group({
      phoneNumber: ['', Validators.required],
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
            this.navCtrl.setRoot(ProfilePage);
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
    return Promise.resolve(true);
    // let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    // return this.profileService.updateUserProfile(profileId, {phoneNumber: this.phoneNumberForm.value.phoneNumber});
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
