import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../entities/user";
import {NavController} from "ionic-angular";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private navCtrl: NavController) {
  }

  login(credentials): Promise<string> {
    // let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOnRydWUsImlzUHJvIjpmYWxzZX0.fHnNNMS5RGvEiHD4hGMsqHabiIwKqJhX-0DjR6Q0rlI"; // customer token
    let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOmZhbHNlLCJpc1BybyI6dHJ1ZX0.RNOEpb2AQ0gi70YeFSm5oOvuUIo8HUPCMV1UPY362xg"; // pro token
    // let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOnRydWUsImlzUHJvIjp0cnVlfQ.imYgG_ds-kmDOGuFOggYjp_ozUzWXm8_XivXIw6Zm0w"; // customer/pro token
    //TODO: store both refresh and access tokens
    this.storeToken(mockToken, this.getUserFromJWT(mockToken));
    return Promise.resolve(mockToken);
    // return new Promise((resolve, reject) => {
    //   this.http.post('localhost:3000/api/authentication/authenticate', credentials)
    //     .map(res => res.json())
    //     .subscribe(
    //       data => {
    //         localStorage.setItem('access_token', data.access_token);
    //         localStorage.setItem('refresh_token', data.refresh_token);
    //         resolve(data.refresh_token);
    //       },
    //       error => {
    //         console.log(error);
    //         reject("error");
    //       }
    //     );
    // });
  }

  storeToken(token, user) {
    if (token && user) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('current_user', JSON.stringify(user));
    }
    else {
      console.log("data is malformed: either the token or the user info is missing!");
    }
  }

  logout() {
    this.destroyToken(JSON.parse(localStorage.getItem('current_user')).id)
      .then((data) => {
        if (data === "token destroyed") {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('current_user');
        }
        else {
          console.log(data);
        }
      });
  }

  destroyToken(userId): Promise<any> {
    return Promise.resolve("Token destroyed");
    // return new Promise((resolve, reject) => {
    //   this.http.get('localhost:3000/api/authentication/logout?id=' + userId)
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

  loggedIn() {
    //TODO: Is this the right place to refresh the token?
    if(!tokenNotExpired()) {
      // refresh the token
    }

    return tokenNotExpired();
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
