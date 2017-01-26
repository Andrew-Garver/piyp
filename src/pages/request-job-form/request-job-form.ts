import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'page-request-job-form',
  templateUrl: 'request-job-form.html',
  providers: [ToastService, JobService, LoadingService]
})
export class RequestJobFormPage {

  private formJobRequest: FormGroup;
  private missingFormFields = false;
  private services: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private toastService: ToastService, private jobService: JobService,
              private loadingService: LoadingService) {

    this.services = [
      {category: "Auto Glass", id: "588994498531fc14a2f42ea0"},
      {category: "HVAC", id: "588994498531fc14a2f42ea2"},
      {category: "Landscaping", id: "588994498531fc14a2f42e9c"},
      {category: "Pool Service", id: "588994498531fc14a2f42e9e"},
      {category: "Tech Support", id: "588994498531fc14a2f42ea4"}
    ];

    this.formJobRequest = formBuilder.group({
      jobName: ['', Validators.required],
      jobCategory: [null, Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  submitJobRequest() {
    if (this.formJobRequest.valid) {
      this.missingFormFields = false;
      this.loadingService.presentLoading();
      this.postData()
        .then((job) => {
          this.loadingService.hideLoading();
          console.log(job);
          this.navCtrl.parent.select(1);
        })
        .catch((err) => {
          this.loadingService.hideLoading();
          console.log(err);
          this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
        });
    }
    else {
      this.missingFormFields = true;
    }
  }

  postData(): Promise<any> {
    let job = {
      "title": this.formJobRequest.value.jobName,
      "category": this.formJobRequest.value.jobCategory,
      "description": this.formJobRequest.value.jobDescription
    };
    return this.jobService.postJob(job);
  }

}
