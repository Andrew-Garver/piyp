import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../entities/user";
import {NavController} from "ionic-angular";
import {TabsPage} from "../../pages/tabs/tabs";
import {tokenNotExpired, JwtHelper} from "angular2-jwt";
import {LoginPage} from "../../pages/login/login";

@Injectable()
export class AuthService {

  private user: User;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private navCtrl: NavController) {}

  // TODO: This is just dummy data
  login(credentials) {
    let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyJ9.OYrzpw8O_3z1oB11UFp6NaBQNbI0Jg10reIElVJBP1o";
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

    this.push(TabsPage);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('current_user');
  }

  push(page) {
    // If user is not logged in we'll send them to the homepage
    if (!this.loggedIn()) {
      this.navCtrl.push(LoginPage);
      return false;
    }
    this.navCtrl.push(page);
    return true;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  private getUserFromJWT(mockToken: string): User {
    this.user = new User();
    this.user.username = this.jwtHelper.decodeToken(mockToken).username;
    this.user.id = this.jwtHelper.decodeToken(mockToken).id;

    return this.user;
  }
}
