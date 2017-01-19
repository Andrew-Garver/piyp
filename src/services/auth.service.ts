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

  logout() {
    this.destroyToken(JSON.parse(localStorage.getItem('current_user')).id)
      .then((data) => {
        if (data === "token destroyed") {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('current_user');
          localStorage.removeItem('current_profile');
        }
        else {
          console.log(data);
        }
      });
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
              localStorage.setItem('current_user', data.user);
              console.log(data.user);
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

  getTokenExpiry(token) {
    if (token) {
      return this.jwtHelper.getTokenExpirationDate(token);
    }
    else {
      return null;
    }
  }

  loggedIn() {
    let accessToken = localStorage.getItem("access_token");
    let refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      // TODO: Check if refresh token is about to expire and get a new one if it is
    }

    if (accessToken) {
      return this.jwtHelper.isTokenExpired(accessToken);
    }
    else {
      return false;
    }
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
