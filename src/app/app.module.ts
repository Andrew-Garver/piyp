import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';
import { JobRequestsPage } from '../pages/job-requests/job-requests';
import { HiredJobsPage } from '../pages/hired-jobs/hired-jobs';
import { RequestJobsPage } from '../pages/RequestJobs/RequestJobs';
import { ProfilePage } from '../pages/Profile/Profile';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import {SignUpPage} from "../pages/signup/sign-up";
import {HttpModule} from "@angular/http";
import {JobDetailsPage} from "../pages/job-details/job-details";

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
    JobDetailsPage
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
    JobDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
