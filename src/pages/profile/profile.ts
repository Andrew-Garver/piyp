import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {ProfileDOBForm} from "../profile-personal-info-forms/dob/dob";
import {StripeTosPage} from "../profile-tos-forms/stripe-tos/stripe-tos";
import {PiypTosPage} from "../profile-tos-forms/piyp-tos/piyp-tos";
import {BusinessTypeForm} from "../profile-business-info-forms/business-type/business-type";
import {BankInfoForm} from "../profile-bank-info-forms/bank-info/bank-info";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private profilePage: any;
  private loadProgress: number;
  private user: any;
  private currentProfile: any;

  constructor(private navCtrl: NavController) {
    this.user = localStorage.getItem('current_user');
    this.currentProfile = localStorage.getItem('current_profile');
    this.profilePage = ProfilePage;
    this.loadProgress = 25;
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

}
