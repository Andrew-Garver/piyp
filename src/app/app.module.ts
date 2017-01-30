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
import {BusinessServicesForm} from "../pages/profile-business-info-forms/business-services/business-services";
import {BankInfoForm} from "../pages/profile-bank-info-forms/bank-info/bank-info";
import {BillingAddressPage} from "../pages/profile-payment-info-forms/billing-address/billing-address";
import {CreditCardPage} from "../pages/profile-payment-info-forms/credit-card/credit-card";
import {NearbyJobsPage} from "../pages/nearby-jobs/nearby-jobs";
import {PlaceBidPage} from "../pages/place-bid/place-bid";
import {SelectInfoToEditPage} from "../pages/settings/personal-info/select-info-to-edit";
import {CreditCardsPage} from "../pages/credit-cards/credit-cards";
import {BusinessNameForm} from "../pages/profile-business-info-forms/business-name/business-name";
import {BusinessTaxIdForm} from "../pages/profile-business-info-forms/business-tax-id/business-tax-id";
import {BankAccountsPage} from "../pages/bank-accounts/bank-accounts";
import {QuestionDetailsPage} from "../question-details/question-details";
import {AskQuestionFormPage} from "../pages/ask-question-form/ask-question-form";
import {Ionic2RatingModule} from "ionic2-rating";
import {RateUserPage} from "../pages/rate-user/rate-user";
import {IntroSlidesPage} from "../pages/into-slides/intro-slides";

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
    BusinessAddressForm,
    BusinessServicesForm,
    BankInfoForm,
    BillingAddressPage,
    CreditCardPage,
    NearbyJobsPage,
    PlaceBidPage,
    SelectInfoToEditPage,
    CreditCardsPage,
    BusinessNameForm,
    BusinessTaxIdForm,
    BankAccountsPage,
    QuestionDetailsPage,
    AskQuestionFormPage,
    RateUserPage,
    IntroSlidesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true"}),
    HttpModule,
    Ionic2RatingModule
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
    BusinessAddressForm,
    BusinessServicesForm,
    BankInfoForm,
    BillingAddressPage,
    CreditCardPage,
    NearbyJobsPage,
    PlaceBidPage,
    SelectInfoToEditPage,
    CreditCardsPage,
    BusinessNameForm,
    BusinessTaxIdForm,
    BankAccountsPage,
    QuestionDetailsPage,
    AskQuestionFormPage,
    RateUserPage,
    IntroSlidesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}
    ]
})
export class AppModule {}
