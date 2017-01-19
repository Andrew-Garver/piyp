import {Component} from '@angular/core';

import {DatabaseService} from "../../services/database.service";
import {NavController, App} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import {FindJobFormPage} from "../find-job-form/find-job-form";

@Component({
  selector: 'page-find-jobs',
  templateUrl: 'find-jobs.html',
  providers: [DatabaseService]
})

export class FindJobsPage {

  constructor(private databaseService: DatabaseService, private navCtrl: NavController,
              private authService: AuthService, private app: App) {
  }

  findJob() {
    this.navCtrl.push(FindJobFormPage)
      .catch(() => {
        this.authService.logout()
          .then(() => this.app.getRootNav().setRoot(LoginPage));
      });
  }
}
