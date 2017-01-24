import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

@Injectable()
export class LoadingService {

  private loader: any;

  constructor(private loadingCtrl: LoadingController) {
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

}
