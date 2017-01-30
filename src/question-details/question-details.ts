import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../services/auth.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {LoadingService} from "../services/loading.service";
import {ToastService} from "../services/toast.service";
import {LoginPage} from "../pages/login/login";

@Component({
  selector: 'page-question-details',
  templateUrl: 'question-details.html',
  providers: [AuthService, LoadingService, ToastService]
})

export class QuestionDetailsPage {
  private formAnswerQuestion: FormGroup;
  private selectedQuestion: any;
  private profileType: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService, private formBuilder: FormBuilder,
              private loadingService: LoadingService, private toastService: ToastService) {
    this.selectedQuestion = params.get("question");
    this.profileType = JSON.parse(localStorage.getItem('current_profile')).type;

    this.formAnswerQuestion = formBuilder.group({
      answer: ['', Validators.required]
    });
  }

  ionViewCanEnter(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.loggedIn()
        .then((data) => {
          if (data) {
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  answerQuestion() {
    if (this.formAnswerQuestion.valid) {
      this.loadingService.presentLoading();
      this.postData()
        .then(() => {
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

  postData(): Promise<any> {
    return Promise.resolve(true);
    // let profileId = JSON.parse(localStorage.getItem('current_profile'))._id;
    // let params = {
    //   inquirer: profileId,
    //   question: this.formAskQuestion.value.question;
    // };
    // return this.profileService.updateUserProfile(profileId, {params: params});
  }

}
