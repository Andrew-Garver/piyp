import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {ProfileDOBForm} from "../profile-personal-info/dob/dob";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private profilePage: any;
  private loadProgress: number;

  constructor(private navCtrl: NavController) {
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
