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
import {HttpModule, Http} from "@angular/http";
import {JobDetailsPage} from "../pages/job-details/job-details";
import {ErrorPage} from "../pages/error/error";
import {CustomerDetailsPage} from "../pages/customer-details/customer-details";
import {ProDetailsPage} from "../pages/pro-details/pro-details";
import {RequestJobFormPage} from "../pages/request-job-form/request-job-form";
import {BidsPage} from "../pages/bids/bids";
import {BidDetailsPage} from "../pages/bid-details/bid-details";
import {FindJobsPage} from "../pages/find-jobs/find-jobs";
import {ManageBidsPage} from "../pages/manage-bids/manage-bids";
import {FindJobFormPage} from "../pages/find-job-form/find-job-form";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {SelectProfilePage} from "../pages/select-profile/select-profile";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {ProfilePersonalAddressForm} from "../pages/profile-personal-info-forms/address/address";
import {ProfileDOBForm} from "../pages/profile-personal-info-forms/dob/dob";
import {PiypTosPage} from "../pages/profile-tos-forms/piyp-tos/piyp-tos";
import {StripeTosPage} from "../pages/profile-tos-forms/stripe-tos/stripe-tos";
import {BusinessTypeForm} from "../pages/profile-business-info-forms/business-type/business-type";
import {BusinessAddressForm} from "../pages/profile-business-info-forms/business-address/business-address";

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "",
    noJwtError: true,
    globalHeaders: [
      {'Accept': 'application/json'},
      {'Authorization': localStorage.getItem('access_token')},
      {'Content-Type': 'application/json'}
      ],
    tokenGetter: (() => localStorage.getItem('access_token')),
  }), http);
}

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
    BidsPage,
    BidDetailsPage,
    FindJobsPage,
    ManageBidsPage,
    FindJobFormPage,
    SelectProfilePage,
    ErrorPage,
    ProgressBarComponent,
    ProfilePersonalAddressForm,
    ProfileDOBForm,
    PiypTosPage,
    StripeTosPage,
    BusinessTypeForm,
    BusinessAddressForm
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true"}),
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
    BidsPage,
    BidDetailsPage,
    FindJobsPage,
    ManageBidsPage,
    FindJobFormPage,
    SelectProfilePage,
    ErrorPage,
    ProfilePersonalAddressForm,
    ProfileDOBForm,
    PiypTosPage,
    StripeTosPage,
    BusinessTypeForm,
    BusinessAddressForm
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}
    ]
})
export class AppModule {}
