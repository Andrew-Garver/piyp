import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {JwtHelper, AuthHttp} from "angular2-jwt";

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp) {
  }

  login(credentials): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/authentication/authenticate', credentials)
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
      this.destroyToken()
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

  destroyToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get('http://localhost:3000/api/authentication/logout')
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.success) {
              resolve("Token destroyed");
            }
            else {
              reject("Unable to destroy token");
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

  isTokenExpired(token) {
    return this.jwtHelper.isTokenExpired(token);
  }

  loggedIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      let accessToken = localStorage.getItem("access_token");
      let refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken && accessToken) {
        let accessTokenExpiry = this.jwtHelper.getTokenExpirationDate(accessToken);
        let timeNow = new Date();

        if (accessTokenExpiry.getTime() - timeNow.getTime() < 60000) {
          console.log("getting new access token");
          this.renewAccessToken(refreshToken)
            .then((data) => {
              resolve(!this.jwtHelper.isTokenExpired(localStorage.getItem("access_token")));
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            })
        }
        else {
          resolve(!this.jwtHelper.isTokenExpired(accessToken));
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
      this.http.post('http://localhost:3000/api/authentication/refresh', {email: userEmail, refreshToken: refreshToken})
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
}
