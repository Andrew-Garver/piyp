import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountCreationService {

  constructor(private http: Http) {}

  createAccount(userInfo, token): Promise<string> {
    // let success = false;
    // this.http.post('https://my-app.com/api/authenticate', {userInfo: userInfo, token: token})
    //   .map(res => res.json())
    //   .subscribe(
    //     data => {
    //       localStorage.setItem('id_token', data.id_token);
    //       success = true;
    //     },
    //         error => console.log(error)
    //   );
    let mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFuZHJldyIsImlzQ3VzdG9tZXIiOmZhbHNlLCJpc1BybyI6dHJ1ZX0.RNOEpb2AQ0gi70YeFSm5oOvuUIo8HUPCMV1UPY362xg"; // pro token

    let res = {
      success: false,
      jwt: mockToken
    };
    return Promise.resolve(JSON.stringify(res));
  }

  testPaymentInfo(paymentInfo): Promise<string> {
    let res = {
      success: true,
      token: "testing123"
    };
    return Promise.resolve(JSON.stringify(res));
  }

}
