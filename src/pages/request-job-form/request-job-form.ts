import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {Job} from "../../entities/job";
import {DatabaseService} from "../../services/database.service";
import {Customer} from "../../entities/customer";
import {JobDetailsPage} from "../job-details/job-details";
import {LoginPage} from "../login/login";
import {ErrorPage} from "../error/error";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-request-job-form',
  templateUrl: 'request-job-form.html',
  providers: [DatabaseService]
})
export class RequestJobFormPage {

  customer: Customer;

  constructor(public navCtrl: NavController, private databaseService: DatabaseService,
              private authService: AuthService) {
    this.customer = JSON.parse(localStorage.getItem('current_user'));
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

  submitJobRequest(formParams) {
    console.log("Job Requested");
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(1);
  }

}
