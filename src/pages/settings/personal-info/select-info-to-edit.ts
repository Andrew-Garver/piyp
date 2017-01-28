import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ToastService} from "../../../services/toast.service";
import {NavController, App} from "ionic-angular";
import {LoginPage} from "../../login/login";
import {ErrorPage} from "../../error/error";
import {ProfilePersonalAddressForm} from "../../profile-personal-info-forms/address/address";


@Component({
  selector: 'page-select-info-to-edit',
  templateUrl: 'select-info-to-edit.html',
  providers: [AuthService, ToastService]
})
export class SelectInfoToEditPage {

  private currentProfileType: any;
  private personalAddressPage: any = ProfilePersonalAddressForm;

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
