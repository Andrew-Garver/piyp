import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {BusinessAddressForm} from "../business-address/business-address";

@Component({
  selector: 'page-business-type-form',
  templateUrl: 'business-type.html'
})
export class BusinessTypeForm {
  private businessTypeForm: FormGroup;

  private formFieldsMissing: boolean = false;
  private authorizedRep: boolean = true;
  private ssnIsValid: boolean = true;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.businessTypeForm = formBuilder.group({
      businessType: ['', Validators.required],
      authorizedRep: [null],
      ssnLast4: ['', Validators.required]
    });
  }

  nextForm() {
    if (!this.businessTypeForm.valid) {
      this.formFieldsMissing = true;
    }
    else if (this.businessTypeForm.value.businessType === "business" && !this.businessTypeForm.value.authorizedRep) {
      this.formFieldsMissing = false;
      this.authorizedRep = false;
    }
    else {
      this.formFieldsMissing = false;
      this.authorizedRep = true;
      this.postData()
        .then(() => {
          this.navCtrl.push(BusinessAddressForm);
        });
      console.log("next");
    }
  }

  checkAuthority() {
    this.authorizedRep = !(this.businessTypeForm.value.businessType === "business" && !this.businessTypeForm.value.authorizedRep);
  }

  checkSSN(ssn) {
    this.ssnIsValid = (ssn != undefined && ssn.length === 4);
  }

  saveAndQuit() {
    this.postData()
      .then(() => {
        this.navCtrl.setRoot(ProfilePage);
      });
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
  }

}
