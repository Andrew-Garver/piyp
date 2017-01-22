import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {TabsPage} from "../../tabs/tabs";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ProfilePage} from "../../profile/profile";
import {BusinessServicesForm} from "../business-services/business-services";

@Component({
  selector: 'page-business-address-form',
  templateUrl: 'business-address.html'
})
export class BusinessAddressForm {
  private businessAddressForm: FormGroup;

  private zipCodeIsValid: boolean;
  private formFieldsMissing: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.zipCodeIsValid = true;

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
      this.postData()
        .then(() => {
          this.navCtrl.push(BusinessServicesForm);
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
    return Promise.resolve(true);
  }

}
