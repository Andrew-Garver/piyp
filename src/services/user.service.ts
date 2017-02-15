import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) {
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/user')
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              localStorage.setItem('current_user', JSON.stringify(data.user));
              resolve(data.user);
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

  getNumberOfUserProfiles(): number {
    if (!localStorage.getItem('current_user')) {
      return null;
    }
    let profiles = JSON.parse(localStorage.getItem('current_user')).profiles;

    return profiles.length;

    // if (profiles.length === 1) {
    //   localStorage.setItem('current_profile', JSON.stringify(profiles[0]));
    //   return 1;
    // }
    // else {
    //   return 2;
    // }
  }
}
