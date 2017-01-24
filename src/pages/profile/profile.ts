import {Component} from '@angular/core';
import {NavController, LoadingController} from "ionic-angular";
import {ProfileDOBForm} from "../profile-personal-info-forms/dob/dob";
import {StripeTosPage} from "../profile-tos-forms/stripe-tos/stripe-tos";
import {PiypTosPage} from "../profile-tos-forms/piyp-tos/piyp-tos";
import {BusinessTypeForm} from "../profile-business-info-forms/business-type/business-type";
import {BankInfoForm} from "../profile-bank-info-forms/bank-info/bank-info";
import {UserService} from "../../services/user.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService, ProfileService]
})
export class ProfilePage {

  private profilePage: any;
  private loadProgress: number = 0;
  private user: any;
  private currentProfile: any;
  private currentProfileId: any;
  private loader: any;

  // Needed account info for Pro
  private stripeTosAccepted: boolean;
  private hasDob: boolean;
  private hasPersonalAddress: boolean;
  private hasBusinessType: boolean;
  private isAuthorizedRep: boolean;
  private hasBusinessName: boolean;
  private hasBusinessAddress: boolean;
  private hasBusinessTaxId: boolean;
  private hasServices: boolean;
  private hasSsnLast4: boolean;
  private hasLinkedBankAccount: boolean;


  constructor(private navCtrl: NavController, private userService: UserService, private profileService: ProfileService,
              private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.userService.getUser()
      .then((user) => {
        this.user = user;
        this.currentProfileId = JSON.parse(localStorage.getItem('current_profile'))._id;
        return this.profileService.getUserProfile(this.currentProfileId);
      })
      .then((profile) => {
        this.currentProfile = profile;
        this.hideLoading();
        this.calculateProgress();
      })
      .catch((err) => {
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
    console.log("Payment Info");
    // this.navCtrl.push(BankInfoForm);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  calculateProgress() {
    if (this.currentProfile) {
      if (this.currentProfile.stripeAccount.tos_acceptance.date) {
        console.log(1);
        this.loadProgress = 10;
      }
      if (this.currentProfile.stripeAccount.legal_entity.dob.year &&
        this.currentProfile.stripeAccount.legal_entity.dob.month &&
        this.currentProfile.stripeAccount.legal_entity.dob.day) {
        console.log(2);
        this.loadProgress = 15;
      }
    }
  }

}
