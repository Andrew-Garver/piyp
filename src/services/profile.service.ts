import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class ProfileService {

  constructor(private authHttp: AuthHttp) {
  }

  getUserProfile(profileId): Promise<any> {
    return new Promise((resolve, reject) => {
      let profile = {
        "type": "consumer",
        "_id": "58b27244d276df0be1664fdc",
        "businessSummary": null,
        "personalPhone": "1111111111",
        "businessPhone": null,
        "reviews": [],
        "registeredServices": [],
        "personalAddress": {
          "_id": "58ad408046229286b2b9831e",
          "geoJsonPoint": {
            "_id": "58ad408146229286b2b9831f",
            "coordinates": [
              -111.7939737,
              43.8183494
            ],
            "type": "Point"
          },
          "country": "US",
          "postalCode": "83440",
          "state": "ID",
          "city": "Rexburg",
          "line2": "Apt 705",
          "line1": "347 S 4 W",
          "businessName": null
        },
        "businessAddress": null,
        "stripeId": "cus_AAFE0aFBxbBL4l",
        "tosAccepted": false,
        "profilePicture": "/Users/andrewgarver/testPics/58ad406a46229286b2b9831d_1487910114794.jpg"
      };

      localStorage.setItem('current_profile', JSON.stringify(profile));
      resolve(profile);
    });
  }

  getUserPublicProfile(profileId, data): Promise<any> {
    let params = "";
    if (data) {
      params += "?";
      for (let key in data) {
        params += key + "=" + data[key] + "&";
      }
      params = params.slice(0, -1);
    }

    return new Promise((resolve, reject) => {
      this.authHttp.get(`http://localhost:3000/api/user/profile/${profileId}/public` + params)
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.profile);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  addProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/user/profile', {})
        .map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem('current_user', JSON.stringify(data.user));
            resolve(true);
          },
          error => {
            console.log("createAccount Failed");
            console.log(error);
            reject(error);
          }
        );
    });
  }

  getProfilePicture(profileId, data): Promise<any> {
    let params = "";
    if (data) {
      params += "?";
      for (let key in data) {
        params += key + "=" + data[key] + "&";
      }
      params = params.slice(0, -1);
    }

    return new Promise((resolve, reject) => {
      this.authHttp.get(`http://localhost:3000/api/user/profile/${profileId}/picture` + params)
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.profilePicture) {
              localStorage.setItem('profile_picture', data.profilePicture);
            }
            else {
              localStorage.removeItem('profile_picture');
            }
            resolve(data.profilePicture);
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
      // this.authHttp.post('http://localhost:3000/api/user/profile/' + profileId, params)
      //   .map(res => res.json())
      //   .subscribe(
      //     data => {
      //       if (data.success) {
      //         localStorage.setItem('current_profile', JSON.stringify(data.profile));
              resolve(JSON.parse(localStorage.getItem('current_profile')));
        //     }
        //     else {
        //       reject("Unable to update user profile");
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //     reject(err);
        //   }
        // );
    });
  }

}
