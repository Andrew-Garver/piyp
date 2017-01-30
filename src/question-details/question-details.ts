import {Component} from '@angular/core';

import {NavController, NavParams} from "ionic-angular";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'page-question-details',
  templateUrl: 'question-details.html',
  providers: [AuthService]
})

export class QuestionDetailsPage {

  selectedQuestion: any;

  constructor(private navCtrl: NavController, private params: NavParams,
              private authService: AuthService) {
    this.selectedQuestion = params.get("question");
  }

  ionViewCanEnter(): Promise<boolean> {
    return new  Promise((resolve, reject) => {
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

}
