import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";
import {LoadingController} from "ionic-angular";

@Injectable()
export class ProfileService {

  private loader: any;

  constructor(private authHttp: AuthHttp, private loadingCtrl: LoadingController) {
  }

  getUserProfile(profileId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/user/profile/' + profileId)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              localStorage.setItem('current_profile', JSON.stringify(data.profile));
              resolve(data.profile);
            }
            else {
              reject("Unable get user from server");
            }
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  updateUserProfile(profileId, params): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/user/profile/' + profileId, params)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              localStorage.setItem('current_profile', JSON.stringify(data.profile));
              resolve(data.profile);
            }
            else {
              reject("Unable to update user profile");
            }
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
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
