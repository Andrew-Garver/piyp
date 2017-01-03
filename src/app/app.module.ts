import { NgModule, ErrorHandler } from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, NavController} from 'ionic-angular';
import { MyApp } from './app.component';
import { JobRequestsPage } from '../pages/job-requests/job-requests';
import { HiredJobsPage } from '../pages/HiredJobs/HiredJobs';
import { RequestJobsPage } from '../pages/RequestJobs/RequestJobs';
import { ProfilePage } from '../pages/Profile/Profile';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import {SignUpPage} from "../pages/signup/sign-up";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    JobRequestsPage,
    HiredJobsPage,
    RequestJobsPage,
    ProfilePage,
    LoginPage,
    TabsPage,
    SignUpPage
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
    SignUpPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
