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
  selector: 'page-find-job-form',
  templateUrl: 'find-job-form.html',
  providers: [DatabaseService]
})
export class FindJobFormPage {

  constructor(public navCtrl: NavController, private databaseService: DatabaseService,
              private authService: AuthService) {
  }

  ionViewCanEnter(): boolean {
    // this.authService.loggedIn()
    //   .then((data) => {
    //     if (data) {
    //       return true;
    //     }
    //     else {
    //       return false;
    //     }
    //   })
    //   .catch((err) => {
    //     return false;
    //   });

    if (this.authService.loggedIn()) {
      return true;
    }
    return false;
  }

  searchForOpenJobs(formParams) {
    console.log("Searching for jobs...");
  }

}
