import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ServicesService} from "../../services/services.service";

@Component({
  selector: 'page-request-job-form',
  templateUrl: 'request-job-form.html',
  providers: [ToastService, JobService, LoadingService, ServicesService]
})
export class RequestJobFormPage {

  private formJobRequest: FormGroup;
  private services: any;
  private formSubmitted: boolean = false;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private toastService: ToastService, private jobService: JobService,
              private loadingService: LoadingService, private servicesService: ServicesService) {

    this.formJobRequest = formBuilder.group({
      jobName: ['', Validators.required],
      jobCategory: [null, Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  validate(input) {
    return !this.formJobRequest.controls[input].valid &&
      (this.formJobRequest.controls[input].touched || this.formSubmitted);
  }

  ionViewWillEnter() {
    this.loadingService.presentLoading();
    this.servicesService.getServices()
      .then((services) => {
        this.loadingService.hideLoading();
        this.services = services;
      })
      .catch((err) => {
        this.displayError(err);
      })
  }

  submitJobRequest() {
    if (this.formJobRequest.valid) {
      this.formSubmitted = false;
      this.loadingService.presentLoading();
      this.postData()
        .then((job) => {
          this.loadingService.hideLoading();
          this.formJobRequest.reset();
          this.navCtrl.parent.select(1);
        })
        .catch((err) => {
          this.displayError(err);
        });
    }
    else {
      this.formSubmitted = true;
    }
  }

  postData(): Promise<any> {
    let job = {
      title: this.formJobRequest.value.jobName,
      service: this.formJobRequest.value.jobCategory,
      description: this.formJobRequest.value.jobDescription
    };
    return this.jobService.postJob(job);
  }

  displayError(err) {
    this.loadingService.hideLoading();
    console.log(err);
    this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
  }
}
