import {Component} from '@angular/core';
import {NavController, LoadingController} from "ionic-angular";
import {ProfileDOBForm} from "../profile-personal-info-forms/dob/dob";
import {StripeTosPage} from "../profile-tos-forms/stripe-tos/stripe-tos";
import {PiypTosPage} from "../profile-tos-forms/piyp-tos/piyp-tos";
import {BusinessTypeForm} from "../profile-business-info-forms/business-type/business-type";
import {BankInfoForm} from "../profile-bank-info-forms/bank-info/bank-info";
import {UserService} from "../../services/user.service";
import {ProfileService} from "../../services/profile.service";
import {LoadingService} from "../../services/loading.service";
import {CreditCardPage} from "../profile-payment-info-forms/credit-card/credit-card";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService, ProfileService, LoadingService]
})
export class ProfilePage {

  private profilePage: any;
  private loadProgress: number = 0;
  private user: any;
  private currentProfile: any;
  private currentProfileId: any;

  /*
   * 0: empty
   * 1: in progress
   * 2: complete
   */
  private tosProgress: number = 0;
  private personalInfoProgress: number = 0;
  private businessInfoProgress: number = 0;
  private bankAccountInfoProgress: number = 0;
  private paymentInfoProgress: number = 0;


  constructor(private navCtrl: NavController, private userService: UserService,
              private profileService: ProfileService, private loadingService: LoadingService) {
  }

  ionViewWillEnter() {
    this.loadingService.presentLoading();
    this.userService.getUser()
      .then((user) => {
        this.user = user;
        this.currentProfileId = JSON.parse(localStorage.getItem('current_profile'))._id;
        return this.profileService.getUserProfile(this.currentProfileId);
      })
      .then((profile) => {
        this.currentProfile = profile;
        console.log(localStorage);
        this.loadingService.hideLoading();
        if (this.currentProfile.type === 'pro') {
          this.calculateProProgress();
        }
        else {
          this.calculateConsumerProgress();
        }
      })
      .catch((err) => {
        this.loadingService.hideLoading();
        console.log("ERROR");
        console.log(err);
      });
  }

  displayTOSForms() {
    //TODO: if (this.user.piypTosAccepted)
    // this.navCtrl.push(StripeTosPage);
    //TODO: else
    this.navCtrl.push(PiypTosPage);
  }

  displayPersonalInfoForms() {
    this.navCtrl.push(ProfileDOBForm);
  }

  displayBusinessInfoForms() {
    this.navCtrl.push(BusinessTypeForm);
  }

  displayBankInfoForms() {
    this.navCtrl.push(BankInfoForm);
  }

  displayPaymentInfoForms() {
    this.navCtrl.push(CreditCardPage);
  }

  calculateProProgress() {
    if (this.currentProfile) {
      if (this.currentProfile.stripeAccount.tos_acceptance.date) {
        this.loadProgress = 25;
        this.tosProgress = 2;
      }
      if (this.currentProfile.stripeAccount.legal_entity.dob.year &&
        this.currentProfile.stripeAccount.legal_entity.dob.month &&
        this.currentProfile.stripeAccount.legal_entity.dob.day) {
        this.loadProgress = 35;
        this.personalInfoProgress = 1;
      }
      if (this.currentProfile.stripeAccount.legal_entity.personal_address.line1 &&
        this.currentProfile.stripeAccount.legal_entity.personal_address.postal_code &&
        this.currentProfile.stripeAccount.legal_entity.personal_address.state &&
        this.currentProfile.stripeAccount.legal_entity.personal_address.city) {
        this.loadProgress = 50;
        this.personalInfoProgress = 2;
      }
      if (this.currentProfile.stripeAccount.legal_entity.type) {
        this.loadProgress = 60;
        this.businessInfoProgress = 1;
      }
      if ((this.currentProfile.stripeAccount.legal_entity.address.line1 &&
        this.currentProfile.stripeAccount.legal_entity.address.postal_code &&
        this.currentProfile.stripeAccount.legal_entity.address.state &&
        this.currentProfile.stripeAccount.legal_entity.address.city /*&&*/
      /*this.currentProfile.stripeAccount.legal_entity.business_tax_id_provided*/) ||
        this.currentProfile.stripeAccount.legal_entity.ssn_last_4_provided) {
        this.loadProgress = 75;
        this.businessInfoProgress = 2;
      }
      if (this.currentProfile.stripeAccount.external_accounts.total_count) {
        this.loadProgress = 100;
        this.bankAccountInfoProgress = 2;
      }
    }
  }

  calculateConsumerProgress() {
    if (this.currentProfile.stripeAccount.legal_entity.dob.year &&
      this.currentProfile.stripeAccount.legal_entity.dob.month &&
      this.currentProfile.stripeAccount.legal_entity.dob.day) {
      this.loadProgress = 20;
      this.personalInfoProgress = 1;
    }
    if (this.currentProfile.stripeAccount.legal_entity.personal_address.line1 &&
      this.currentProfile.stripeAccount.legal_entity.personal_address.postal_code &&
      this.currentProfile.stripeAccount.legal_entity.personal_address.state &&
      this.currentProfile.stripeAccount.legal_entity.personal_address.city) {
      this.loadProgress = 50;
      this.personalInfoProgress = 2;
    }
  }

}
