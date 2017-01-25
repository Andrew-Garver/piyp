import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-request-job-form',
  templateUrl: 'request-job-form.html',
})
export class RequestJobFormPage {

  private formJobRequest: FormGroup;
  private missingFormFields = false;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {

    this.formJobRequest = formBuilder.group({
      jobName: ['', Validators.required],
      jobCategory: ['', Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  submitJobRequest() {
    if (this.formJobRequest.valid) {
      this.missingFormFields = false;
      console.log("Job Requested");
      this.navCtrl.parent.select(1);
    }
    else {
      this.missingFormFields = true;
    }
  }

}
