import {Component, ViewChild} from '@angular/core';

import {NavController, ViewController, Slides} from 'ionic-angular';
import {FormControl, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {

  @ViewChild('signupSlider') slider: Slides;
  private slideOptions = {
    pager: true
  };
  private formAccountType: FormGroup;
  private formPersonalInformation: FormGroup;
  private formLoginInformation: FormGroup;
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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {
    this.formAccountType = formBuilder.group({
      checkboxPro: ['checkbox_pro'],
      checkboxConsumer: ['checkbox_consumer'],
      businessType: ['individual']
    });

    this.formPersonalInformation = formBuilder.group({
      fullName: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*')]), null],
      DOB: ['', SignUpValidator.validateDOB],
      addressLine1: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
      addressLine2: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9. ]*')]), null],
      state: [''],
      city: [''],
      zipCode: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(5),
        Validators.pattern('[0-9]*')]), null]
    });

    this.formLoginInformation = formBuilder.group({

    });
  }

  signUp() {
    if (!this.formAccountType.valid) {
      this.slider.slideTo(0);
    }
    else if (!this.formPersonalInformation.valid) {
      this.slider.slideTo(1);
    }
    else if (!this.formLoginInformation.valid) {
      this.slider.slideTo(2);
    }
    else {
      this.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  validateZip(): boolean {
    return false;
  }

  slideNext() {
    this.slider.slideNext();
  }

}
