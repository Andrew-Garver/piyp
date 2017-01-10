import {Component, ViewChild} from '@angular/core';

import {NavController, ViewController, Slides} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})

export class SignUpPage {

  @ViewChild('signupSlider') slider: Slides;
  private slideOptions = {
    pager: true
  };
  private formAccountType: FormGroup;
  private formPersonalInformation: FormGroup;
  private formLoginInformation: FormGroup;
  private fieldsMissing: boolean;
  private invalidZip: boolean;
  private noAccountTypeSelected: boolean;
  private passwordsMatch: boolean;
  private checkboxPro: string;
  private checkboxConsumer: string;
  private businessType: string;
  private fullName: string;
  private DOB: string;
  private addressLine1: string;
  private addressLine2: string;
  private state: string;
  private city: string;
  private zipCode: number;
  private email: string;
  private password1: string;
  private password2: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.fieldsMissing = false;
    this.invalidZip = false;
    this.noAccountTypeSelected = false;
    this.passwordsMatch = true;

    this.formAccountType = formBuilder.group({
      businessType: ['individual']
    });

    this.formPersonalInformation = formBuilder.group({
      fullName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required]), null],
      DOB: ['', Validators.compose([SignUpValidator.validateDOB, Validators.required])],
      addressLine1: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*'), Validators.required]), null],
      addressLine2: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*'), Validators.required]), null]
    });

    this.formLoginInformation= formBuilder.group({
      email: [''/*, null, signupValidator.validateEmail*/]
    });
  }

  checkIfAccountTypeSelected(): boolean {
    if (!this.checkboxPro && !this.checkboxConsumer) {
      this.noAccountTypeSelected = true;
      return false;
    }
    else {
      this.noAccountTypeSelected = false;
      return true;
    }
  }

  checkPasswords() {
    if (this.password2) {
      if (this.password1 === this.password2) {
        this.passwordsMatch = true;
      }
      else {
        this.passwordsMatch = false;
      }
    }
    else {
      this.passwordsMatch = true;
    }
  }

  checkZip(data) {
    if (data != undefined && data.length != 5) {
      this.invalidZip = true;
    }
    else {
      this.invalidZip = false;
    }
  }

  signUp() {
    if (!this.formLoginInformation.valid) {
      this.fieldsMissing = true;
    }
    else {
      this.fieldsMissing = false;
    }

    if (!this.formAccountType.valid || !this.checkIfAccountTypeSelected()) {
      this.fieldsMissing = true;
      this.slider.slideTo(0);
    }
    else if (!this.formPersonalInformation.valid) {
      this.fieldsMissing = true;
      this.slider.slideTo(1);
    }
    else {
      this.fieldsMissing = false;
      this.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  slideNext(form: string) {
    if (form === "formAccountType") {
      this.checkIfAccountTypeSelected();
      if (!this.noAccountTypeSelected) {
        this.slider.slideNext();
      }
    }
    else if (form === "formPersonalInformation" && !this.formPersonalInformation.valid) {
      this.fieldsMissing = true;
    }
    else {
      this.fieldsMissing = false;
      this.slider.slideNext();
    }
  }

}
