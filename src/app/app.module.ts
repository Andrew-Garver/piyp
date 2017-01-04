import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { JobRequestsPage } from '../pages/job-requests/job-requests';
import { HiredJobsPage } from '../pages/hired-jobs/hired-jobs';
import { RequestJobsPage } from '../pages/request-jobs/request-jobs';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import {SignUpPage} from "../pages/signup/sign-up";
import {HttpModule} from "@angular/http";
import {JobDetailsPage} from "../pages/job-details/job-details";
import {ErrorPage} from "../pages/error/error";
import {CustomerDetailsPage} from "../pages/customer-details/customer-details";
import {ProDetailsPage} from "../pages/pro-details/pro-details";
import {RequestJobFormPage} from "../pages/request-job-form/request-job-form";

@NgModule({
  declarations: [
    MyApp,
    JobRequestsPage,
    HiredJobsPage,
    RequestJobsPage,
    ProfilePage,
    LoginPage,
    TabsPage,
    SignUpPage,
    JobDetailsPage,
    CustomerDetailsPage,
    ProDetailsPage,
    RequestJobFormPage,
    ErrorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    JobRequestsPage,
    HiredJobsPage,
    RequestJobsPage,
    ProfilePage,
    LoginPage,
    TabsPage,
    SignUpPage,
    JobDetailsPage,
    CustomerDetailsPage,
    ProDetailsPage,
    RequestJobFormPage,
    ErrorPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
