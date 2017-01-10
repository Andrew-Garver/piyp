import {Component, ViewChild} from '@angular/core';

import {NavController, ViewController, Slides, ToastController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {SignUpValidator} from "./sign-up.validator";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {

  @ViewChild('signupSlider') slider: Slides;

  private formAccountType: FormGroup;
  private formPersonalInformation: FormGroup;
  private formLoginInformation: FormGroup;
  private accountFieldsMissing: boolean;
  private personalFieldsMissing: boolean;
  private loginFieldsMissing: boolean;
  private invalidZip: boolean;
  private invalidPassword: boolean;
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
  private country: string;
  private email: string;
  private password1: string;
  private password2: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController,
              public formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.accountFieldsMissing = false;
    this.personalFieldsMissing = false;
    this.loginFieldsMissing = false;
    this.invalidZip = false;
    this.noAccountTypeSelected = false;
    this.passwordsMatch = true;
    this.invalidPassword = false;
    this.country = "US";

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
      email: ['', Validators.compose([Validators.maxLength(45), Validators.pattern('[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}')]), SignUpValidator.validateEmail]
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

    if (this.password1 && this.password1.length < 8) {
      this.invalidPassword = true;
    }
    else {
      this.invalidPassword = false;
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
    this.checkPasswords();
    if (this.invalidPassword) {
      return;
    }

    if (!this.formLoginInformation.valid || !this.password1 || !this.password2) {
      this.loginFieldsMissing = true;
    }
    else {
      this.loginFieldsMissing = false;
    }

    if (!this.formAccountType.valid || !this.checkIfAccountTypeSelected()) {
      this.accountFieldsMissing = true;
      this.slider.slideTo(0);
    }
    else if (!this.formPersonalInformation.valid) {
      this.personalFieldsMissing = true;
      this.accountFieldsMissing = false;
      this.slider.slideTo(1);
    }
    else if (this.formLoginInformation.valid && this.passwordsMatch) {
      this.accountFieldsMissing = false;
      this.personalFieldsMissing = false;
      this.loginFieldsMissing = false;
      console.log("Full Name: " + this.formPersonalInformation.value.fullName);
      console.log("DOB: " + this.formPersonalInformation.value.DOB);
      console.log("Address 1: " + this.formPersonalInformation.value.addressLine1);
      console.log("Address 2: " + this.formPersonalInformation.value.addressLine2);
      console.log("State: " + this.formPersonalInformation.value.state);
      console.log("City: " + this.formPersonalInformation.value.city);
      console.log("Zip: " + this.formPersonalInformation.value.zipCode);
      console.log("Country: " + this.country);
      console.log("Pro: " + this.checkboxPro);
      console.log("Customer: " + this.checkboxConsumer);
      console.log("Business Type: " + this.formAccountType.value.businessType);
      console.log("Email: " + this.formLoginInformation.value.email);
      console.log("Password: " + this.password1);

      this.presentToast();
      this.dismiss();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Account created! Please login.',
      duration: 4000,
      position: "top"
    });
    toast.present();
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
      this.personalFieldsMissing = true;
    }
    else {
      this.personalFieldsMissing = false;
      this.slider.slideNext();
    }
  }

}
