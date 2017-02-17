import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../../login/login";
import {ErrorPage} from "../../error/error";
import {ProfilePersonalAddressForm} from "../../profile-personal-info-forms/address/address";
import {BusinessServicesForm} from "../../profile-business-info-forms/business-services/business-services";
import {CreditCardsPage} from "../../credit-cards/credit-cards";
import {BusinessTypeForm} from "../../profile-business-info-forms/business-type/business-type";
import {BusinessNameForm} from "../../profile-business-info-forms/business-name/business-name";
import {BusinessAddressForm} from "../../profile-business-info-forms/business-address/business-address";
import {BankAccountsPage} from "../../bank-accounts/bank-accounts";
import {PhoneNumberPage} from "../../phone-number/phone-number";


@Component({
  selector: 'page-select-info-to-edit',
  templateUrl: 'select-info-to-edit.html',
  providers: [AuthService, ToastService]
})
export class SelectInfoToEditPage {

  private currentProfileType: any;
  private personalAddressPage: any = ProfilePersonalAddressForm;
  private servicesOfferedPage: any = BusinessServicesForm;
  private creditCardsPage: any = CreditCardsPage;
  private businessTypePage: any = BusinessTypeForm;
  private businessNamePage: any = BusinessNameForm;
  private businessAddressPage: any = BusinessAddressForm;
  private bankAccountsPage: any = BankAccountsPage;
  private phoneNumberPage: any = PhoneNumberPage;

  constructor(public navCtrl: NavController, private app: App, private authService: AuthService,
              private toastService: ToastService) {
    this.currentProfileType = JSON.parse(localStorage.getItem('current_profile')).type;
  }

  private pushPage(page) {
    if (page) {
      this.navCtrl.push(page, {edit: true})
        .catch(() => {
          this.authService.logout()
            .then(() => {
              this.app.getRootNav().setRoot(LoginPage);
              this.toastService.presentToast("Your session has expired. Please login again.");
            });
        });
    }
    else {
      this.navCtrl.push(ErrorPage);
    }
  }

}
