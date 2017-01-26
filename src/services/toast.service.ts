import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: "top",
    });
    toast.present();
  }

  presentTimedToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }
}
