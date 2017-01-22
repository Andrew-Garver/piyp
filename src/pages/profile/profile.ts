import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {ProfileDOBForm} from "../profile-personal-info-forms/dob/dob";
import {ProfilePersonalAddressForm} from "../profile-personal-info-forms/address/address";

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

  displayTOSPage() {
    console.log("TOS");
  }

  displayPersonalInfoPage() {
    this.navCtrl.push(ProfileDOBForm);
  }

  displayBusinessInfoPage() {
    console.log("BUSINESS");
  }

  displayBankInfoPage() {
    console.log("BANK");
  }

}
