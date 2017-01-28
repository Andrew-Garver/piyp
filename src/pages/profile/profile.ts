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
import {AuthService} from "../../services/auth.service";
import {LoginPage} from "../login/login";
import {ToastService} from "../../services/toast.service";
import {ProfilePersonalAddressForm} from "../profile-personal-info-forms/address/address";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserService, ProfileService, LoadingService, AuthService, ToastService]
})
export class ProfilePage {

  private tabBarElement: any;
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

  /*
   * Profile Statistics
   */
  // Pro
  private amountInAccount: number = 0;
  private activeJobsPro: number = 0;
  private totalJobsWorked: number = 0;
  private totalAmountMade: number = 0;

  // Consumer
  private activeJobsConsumer: number = 0;
  private totalJobsHired: number = 0;
  private favoritePro: string;

  constructor(private navCtrl: NavController, private userService: UserService,
              private profileService: ProfileService, private loadingService: LoadingService,
              private authService: AuthService, private toastService: ToastService) {
    this.tabBarElement = document.querySelector('.tabbar');
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
    this.navCtrl.push(StripeTosPage)
      .catch(() => {
        this.logout();
      });
  }

  displayPersonalInfoForms() {
    let pageToPush: any = ProfileDOBForm;
    if (this.currentProfile.type === 'consumer') {
      pageToPush = ProfilePersonalAddressForm;
    }
    this.navCtrl.push(pageToPush)
      .catch(() => {
        this.logout();
      });

  }

  displayBusinessInfoForms() {
    this.navCtrl.push(BusinessTypeForm)
      .catch(() => {
        this.logout();
      });
  }

  displayBankInfoForms() {
    this.navCtrl.push(BankInfoForm)
      .catch(() => {
        this.logout();
      });
  }

  displayPaymentInfoForms() {
    this.navCtrl.push(CreditCardPage)
      .catch(() => {
        this.logout();
      });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
    this.toastService.presentToast("Your session has expired. Please login again.");
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
      if (this.currentProfile.registeredServices.length > 0 &&
        this.currentProfile.businessAddress &&
        (this.currentProfile.stripeAccount.legal_entity.business_tax_id_provided || this.currentProfile.stripeAccount.legal_entity.type === 'individual')) {
        this.loadProgress = 75;
        this.businessInfoProgress = 2;
      }
      if (this.currentProfile.stripeAccount.external_accounts.total_count) {
        this.loadProgress = 100;
        this.bankAccountInfoProgress = 2;
      }
    }

    if (this.tabBarElement) {
      if (this.bankAccountInfoProgress !== 2) {
        this.tabBarElement.style.display = 'none';
      }
      else {
        this.tabBarElement.style.display = 'flex';
      }
    }
  }

  calculateConsumerProgress() {
    if (this.currentProfile) {
      if (this.currentProfile.personalAddress && this.currentProfile.personalAddress.line1 &&
        this.currentProfile.personalAddress.postalCode &&
        this.currentProfile.personalAddress.state &&
        this.currentProfile.personalAddress.city) {
        this.loadProgress = 50;
        this.personalInfoProgress = 2;
      }
      if (this.currentProfile.stripeAccount.sources.total_count) {
        this.loadProgress = 100;
        this.paymentInfoProgress = 2;
      }
    }

    if (this.tabBarElement) {
      if (this.paymentInfoProgress !== 2) {
        this.tabBarElement.style.display = 'none';
      }
      else {
        this.tabBarElement.style.display = 'flex';
      }
    }
  }

  goToPage(page: string) {
    switch (page) {
      case 'hiredJobsPro':
        this.navCtrl.parent.select(0);
        break;
      case 'hiredJobsConsumer':
        this.navCtrl.parent.select(2);
        break;
    }
  }

}
