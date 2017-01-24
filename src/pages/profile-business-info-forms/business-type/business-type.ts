import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {BusinessAddressForm} from "../business-address/business-address";
import {BusinessServicesForm} from "../business-services/business-services";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'page-business-type-form',
  templateUrl: 'business-type.html',
  providers: [ProfileService]
})
export class BusinessTypeForm {
  private businessTypeForm: FormGroup;

  private formFieldsMissing: boolean = false;
  private authorizedRep: boolean = true;
  private ssnIsValid: boolean = true;
  private missingBusinessName: boolean = false;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private profileService: ProfileService) {
    this.businessTypeForm = formBuilder.group({
      businessType: ['', Validators.required],
      authorizedRep: [null],
      ssnLast4: ['', Validators.pattern('^[0-9]*$')],
      businessName: ['']
    });
  }

  nextForm() {
    this.checkAuthority();
    this.checkSSN();
    this.checkBusinessName();
    if (!this.businessTypeForm.valid) {
      this.formFieldsMissing = true;
    }
    else if (this.businessTypeForm.value.businessType === "company" && !this.businessTypeForm.value.authorizedRep) {
      this.formFieldsMissing = false;
      this.authorizedRep = false;
    }
    else if (this.ssnIsValid && !this.missingBusinessName) {
      this.formFieldsMissing = false;
      this.authorizedRep = true;
      this.profileService.presentLoading();
      this.postData()
        .then(() => {
          this.profileService.hideLoading();
          if (this.businessTypeForm.value.businessType === "company") {
            this.navCtrl.push(BusinessAddressForm);
          }
          else {
            this.navCtrl.push(BusinessServicesForm);
          }
        });
    }
  }

  checkAuthority() {
    this.authorizedRep = !(this.businessTypeForm.value.businessType === "company" && !this.businessTypeForm.value.authorizedRep);
  }

  checkSSN() {
    this.ssnIsValid = !(this.businessTypeForm.value.businessType === "individual" && this.businessTypeForm.value.ssnLast4.length !== 4);
  }

  checkBusinessName() {
    // TODO: Check if business name already exists?
    this.missingBusinessName = (this.businessTypeForm.value.businessType === "company" && !this.businessTypeForm.value.businessName)
  }

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    let params = {
      businessType: this.businessTypeForm.value.businessType,
      ssnLast4: this.businessTypeForm.value.ssnLast4
    };
    return this.profileService.updateUserProfile(profileId, params);
  }

}
