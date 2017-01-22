import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {ProfilePersonalAddressForm} from "../address/address";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {TabsPage} from "../../tabs/tabs";

@Component({
  selector: 'page-profile-dob-form',
  templateUrl: 'dob.html'
})
export class ProfileDOBForm {

  private dobForm: FormGroup;
  private formIsValid: boolean;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.formIsValid = true;

    this.dobForm = formBuilder.group({
      dob: ['', Validators.required]
    });
  }

  nextPage() {
    if (this.dobForm.valid) {
      this.formIsValid = true;
      this.postData()
        .then(() => {
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
        this.navCtrl.setRoot(TabsPage);
      });
  }

  postData(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
