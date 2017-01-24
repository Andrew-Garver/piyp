import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {TabsPage} from "../../tabs/tabs";
import {ProfilePage} from "../../profile/profile";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'page-profile-dob-form',
  templateUrl: 'dob.html',
  providers: [ProfileService]
})
export class ProfileDOBForm {
  private dobForm: FormGroup;
  private formIsValid: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.formIsValid = true;

    // let dobObj = JSON.parse(localStorage.getItem('current_profile')).stripeAccount.legal_entity.dob;
    // // this.dob = (dobObj.year && dobObj.month && dobObj.day) ? dobObj.year + "-" + dobObj.month + "-" + dobObj.day : '';

    //TODO: WTF???
    // console.log(new Date("1997-1-1"));
    // console.log(new Date("1997-1-1").toISOString());

    this.dobForm = formBuilder.group({
      dob: ['', Validators.required]
    });
  }

  nextPage() {
    if (this.dobForm.valid) {
      this.profileService.presentLoading();
      this.formIsValid = true;
      this.postData()
        .then(() => {
          this.profileService.hideLoading();
          this.navCtrl.push(ProfilePersonalAddressForm);
        });
    }
    else {
      this.formIsValid = false;
    }
  }

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    console.log(this.dobForm.value.dob);
    let dobParts = this.dobForm.value.dob.split("-");
    let dob = {
      "year": dobParts[0],
      "month": dobParts[1],
      "day": dobParts[2]
    };
    return this.profileService.updateUserProfile(profileId, {dob: dob});
  }
}
