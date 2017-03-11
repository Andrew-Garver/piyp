import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) {
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      let user = {
        "_id": "58b27244d276df0be1664fdb",
        "firstName": "Test",
        "lastName": "User",
        "email": "test@gmail.com",
        "password": "$2a$10$n3XM9T3zyr64HaLkZD8w.OxkLZ5Um5PZp4IOWAgiqtfv/UDdrYKAi",
        "refreshTokens": [],
        "profiles": [
          {
            "type": "consumer",
            "_id": "58b27244d276df0be1664fdc",
            "businessSummary" : null,
            "personalPhone" : "1111111111",
            "businessPhone" : null,
            "reviews" : [ ],
            "registeredServices" : [ ],
            "personalAddress" : {
              "_id" : "58ad408046229286b2b9831e",
              "geoJsonPoint" : {
                "_id" : "58ad408146229286b2b9831f",
                "coordinates" : [
                  -111.7939737,
                  43.8183494
                ],
                "type" : "Point"
              },
              "country" : "US",
              "postalCode" : "83440",
              "state" : "ID",
              "city" : "Rexburg",
              "line2" : "Apt 705",
              "line1" : "347 S 4 W",
              "businessName" : null
            },
            "businessAddress" : null,
            "stripeId" : "cus_AAFE0aFBxbBL4l",
            "tosAccepted" : false,
            "profilePicture" : "/Users/andrewgarver/testPics/58ad406a46229286b2b9831d_1487910114794.jpg"
          }
        ],
        "__v": 4
      };

      localStorage.setItem('current_user', JSON.stringify(user));
      resolve(user);
    });
  }

  getNumberOfUserProfiles(): number {
    if (!localStorage.getItem('current_user')) {
      return null;
    }
    let profiles = JSON.parse(localStorage.getItem('current_user')).profiles;

    return profiles.length;
  }
}
