import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {ToastService} from "../../services/toast.service";
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import {AuthHttp} from "angular2-jwt";
import {Response} from "@angular/http";
import {Observable} from "rxjs";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'page-ask-question-form',
  templateUrl: 'ask-question-form.html',
  providers: [AuthService, LoadingService, ToastService, JobService]
})
export class AskQuestionFormPage {

  private formAskQuestion: FormGroup;
  private job: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
              private authService: AuthService, private loadingService: LoadingService,
              private toastService: ToastService, private navParams: NavParams,
              private jobService: JobService) {

    this.formAskQuestion = formBuilder.group({
      question: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.job = this.navParams.get('job');
  }

  submitQuestion() {
    if (this.formAskQuestion.valid) {
      this.loadingService.presentLoading();
      this.jobService.askQuestion(this.job._id, this.formAskQuestion.value.question)
          .then((questions) => {
            if (questions) {
              console.log(questions);
              this.job.qa = questions;
            }
            this.loadingService.hideLoading();
            this.navCtrl.pop()
                .catch(() => {
                  this.authService.logout()
                      .then(() => {
                        this.navCtrl.setRoot(LoginPage);
                        this.toastService.presentToast("Your session has expired. Please login again.");
                      });
                });
          })
          .catch((err) => {
            console.log(err);
            this.loadingService.hideLoading();
            this.toastService.presentToast("Could not reach PIYP servers. Check your data connection and try again.")
          });
    }
  }

}
