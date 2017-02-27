import {Component, DoCheck} from '@angular/core';

import {NavController, NavParams, AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {JobService} from "../../services/job.service";
import {LoadingService} from "../../services/loading.service";
import {ServicesService} from "../../services/services.service";
import {Camera} from "ionic-native";
import {MyProjectsPage} from "../my-projects/my-projects";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-request-job-form',
  templateUrl: 'request-job-form.html'
})
export class RequestJobFormPage {

  private formJobRequest: FormGroup;
  private services: any;
  private formSubmitted: boolean = false;
  private currentProfile: any = false;
  private projectImages: any[];

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private toastService: ToastService, private jobService: JobService,
              private loadingService: LoadingService, private servicesService: ServicesService,
              private alertCtrl: AlertController, private authService: AuthService) {

    this.currentProfile = JSON.parse(localStorage.getItem('current_profile'));

    this.formJobRequest = formBuilder.group({
      jobName: ['', Validators.required],
      jobCategory: [null, Validators.required],
      jobDescription: ['', Validators.required]
    });
  }

  addProjectImage() {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.DATA_URL
    })
      .then((imageData) => {
        let image = "data:image/jpeg;base64," + imageData;
        if (!this.projectImages) {
          this.projectImages = [];
        }
        this.projectImages.push(image);
      })
      .catch((err) => {
        this.toastService.presentToast("Something went wrong when trying to access your photos. Please try again.");
        console.log(err);
      });
  }

  removeProjectImage(index) {
    let confirm = this.alertCtrl.create({
      title: 'Remove this image?',
      message: 'Would you like to remove this image from the project?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.projectImages.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
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
        this.loadingService.hideLoading();
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
          this.navCtrl.setRoot(MyProjectsPage)
            .catch(() => {
              this.authService.logout()
                .then(() => {
                  this.navCtrl.setRoot(LoginPage);
                  this.toastService.presentToast("Your session has expired. Please login again.");
                });
            });
        })
        .catch((err) => {
          this.loadingService.hideLoading();
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
      description: this.formJobRequest.value.jobDescription,
      images: this.projectImages
    };
    return this.jobService.postJob(job);
  }

  displayError(err) {
    console.log(err);
    this.toastService.presentToast(err)
  }
}
