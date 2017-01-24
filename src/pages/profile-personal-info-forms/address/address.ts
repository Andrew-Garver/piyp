import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'page-profile-personal-address-form',
  templateUrl: 'address.html',
  providers: [ProfileService]
})
export class ProfilePersonalAddressForm {
  private addressForm: FormGroup;

  private zipCodeIsValid: boolean;
  private formFieldsMissing: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
  private profileService: ProfileService) {
    this.zipCodeIsValid = true;

    this.addressForm = formBuilder.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null]
    });
  }

  finishForm() {
    if (this.addressForm.valid) {
      this.formFieldsMissing = false;
      this.postData()
        .then(() => {
          this.navCtrl.setRoot(ProfilePage);
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

  postData(): Promise<boolean> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let address = {
      "address1": this.addressForm.value.addressLine1,
      "address2": this.addressForm.value.addressLine2,
      "city": this.addressForm.value.city,
      "state": this.addressForm.value.state,
      "zip": this.addressForm.value.zip
    };
    return this.profileService.updateUserProfile(profileId, {personalAddress: address});
  }

}
