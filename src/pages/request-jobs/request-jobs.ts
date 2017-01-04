import {Component} from '@angular/core';

import {NavController, App} from 'ionic-angular';
import {RequestJobFormPage} from "../request-job-form/request-job-form";
import {LoginPage} from "../login/login";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'page-request-jobs',
  templateUrl: 'request-jobs.html'
})
export class RequestJobsPage {

  constructor(public navCtrl: NavController, private authService: AuthService,
              private app: App) {

  }

  // TODO: It might be a bit tedious to duplicate these lines for each NavGuarded call
  requestJob() {
    this.navCtrl.push(RequestJobFormPage)
      .catch(() => {
        this.authService.logout();
        this.app.getRootNav().setRoot(LoginPage);
      });
  }

}
