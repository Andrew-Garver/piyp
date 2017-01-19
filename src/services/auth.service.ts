import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../entities/user";
import {NavController, ToastController} from "ionic-angular";
import {tokenNotExpired, JwtHelper, AuthHttp} from "angular2-jwt";

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private navCtrl: NavController,
              private authHttp: AuthHttp, private toastCtrl: ToastController) {
  }

  login(credentials): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/authenticate', credentials)
        .map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            resolve(true);
          },
          error => {
            console.log(error);
            reject("error");
          }
        );
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.destroyToken(JSON.parse(localStorage.getItem('current_user')).id)
        .then((data) => {
          console.log("clearing storage");
          localStorage.clear();
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    })
  }

  destroyToken(userId): Promise<any> {
    return Promise.resolve("token destroyed");
    // return new Promise((resolve, reject) => {
    //   this.authHttp.get('localhost:3000/api/authentication/logout?id=' + userId)
    //     .map(res => res.json())
    //     .subscribe(
    //       data => {
    //         if (data.success) {
    //           resolve("Token destroyed");
    //         }
    //         else {
    //           reject("Unable to destroy token");
    //         }
    //       },
    //       err => {
    //         console.log(err);
    //         reject(err);
    //       }
    //     );
    // });
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/user')
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              localStorage.setItem('current_user', JSON.stringify(data.user));
              resolve(true);
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

  getUserProfile(): number {
    if (!localStorage.getItem('current_user')) {
      return null;
    }
    let user = JSON.parse(localStorage.getItem('current_user'));
    let profiles = user.profiles;

    if (profiles.length === 1) {
      localStorage.setItem('current_profile', JSON.stringify(profiles[0]));
      return 1;
    }
    else {
      return 2;
    }
  }

  getTokenExpiry(token) {
    if (token) {
      return this.jwtHelper.getTokenExpirationDate(token);
    }
    else {
      return null;
    }
  }

  loggedIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      let accessToken = localStorage.getItem("access_token");
      let refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && accessToken) {
        let accessTokenExpiry = this.jwtHelper.getTokenExpirationDate(accessToken);
        let timeNow = new Date();

        console.log(accessTokenExpiry);
        console.log(timeNow);
        console.log("-------");
        console.log(accessTokenExpiry.getTime());
        console.log(timeNow.getTime());

        if (accessTokenExpiry.getTime() - timeNow.getTime() < 60000) {
          console.log("getting new access token");
          this.renewAccessToken(refreshToken)
            .then((data) => {
              resolve(!this.jwtHelper.isTokenExpired(refreshToken));
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            })
        }
        else {
          console.log("accessToken is still good");
          resolve(!this.jwtHelper.isTokenExpired(refreshToken));
        }
      }
      else {
        resolve(false);
      }
    });
  }

  private renewAccessToken(refreshToken): Promise<any> {
    let userEmail = JSON.parse(localStorage.getItem('current_user')).email;

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/refresh', {email: userEmail, refreshToken: refreshToken})
        .map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem('access_token', data.accessToken);
            resolve(true);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  private getUserFromJWT(mockToken: string): User {
    let user = new User();
    user.email = this.jwtHelper.decodeToken(mockToken).username;
    user.id = this.jwtHelper.decodeToken(mockToken).id;
    user.isConsumer = this.jwtHelper.decodeToken(mockToken).isConsumer;
    user.isPro = this.jwtHelper.decodeToken(mockToken).isPro;

    return user;
  }
}
