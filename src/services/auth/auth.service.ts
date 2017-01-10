import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../entities/user";
import {NavController} from "ionic-angular";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthService {

  private user: User;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private navCtrl: NavController) {}

  // TODO: This is just dummy data
  login(credentials): boolean {
    // let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOnRydWUsImlzUHJvIjpmYWxzZX0.fHnNNMS5RGvEiHD4hGMsqHabiIwKqJhX-0DjR6Q0rlI"; // customer token
    let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOmZhbHNlLCJpc1BybyI6dHJ1ZX0.RNOEpb2AQ0gi70YeFSm5oOvuUIo8HUPCMV1UPY362xg"; // pro token
    // let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOnRydWUsImlzUHJvIjp0cnVlfQ.imYgG_ds-kmDOGuFOggYjp_ozUzWXm8_XivXIw6Zm0w"; // customer/pro token
    localStorage.setItem('id_token', mockToken);
    localStorage.setItem('current_user', JSON.stringify(this.getUserFromJWT(mockToken)));
    // this.http.post('https://my-app.com/api/authenticate', credentials)
    //   .map(res => res.json())
    //   .subscribe(
    //     // We're assuming the response will be an object
    //     // with the JWT on an id_token key
    //     data => localStorage.setItem('id_token', data.id_token),
    //     error => console.log(error)
    //   );

    if (localStorage.getItem('id_token')) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('current_user');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  private getUserFromJWT(mockToken: string): User {
    this.user = new User();
    this.user.username = this.jwtHelper.decodeToken(mockToken).username;
    this.user.id = this.jwtHelper.decodeToken(mockToken).id;
    this.user.isCustomer = this.jwtHelper.decodeToken(mockToken).isCustomer;
    this.user.isPro = this.jwtHelper.decodeToken(mockToken).isPro;

    return this.user;
  }
}
