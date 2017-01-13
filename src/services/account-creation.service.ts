import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var Stripe: any;

@Injectable()
export class AccountCreationService {

  private paymentToken: string;

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

    return Promise.resolve(JSON.stringify(mockToken));
  }

  testPaymentInfo(paymentInfo): Promise<string> {
    return new Promise((resolve, reject) => {
      Stripe.setPublishableKey('pk_test_FZHQgh9n93qAURvTBJXGwAF8');
      Stripe.card.createToken({
        number: paymentInfo.creditCardNumber,
        cvc: paymentInfo.cvc,
        exp_month: new Date(paymentInfo.expDate).getMonth() + 1,
        exp_year: new Date(paymentInfo.expDate).getFullYear(),
        address_zip: paymentInfo.billingZip
      }, (status, response) => {
        this.stripeResponseHandler(status, response, resolve, reject);
      });
    });
  }

  stripeResponseHandler(status, response, resolve, reject) {
    if (response.error) {
      console.log("error getting payment token from Stripe!");
      reject(response.error);
    }
    else {
      console.log("token retrieved successfully!")
      resolve(response.id);
    }
  }

}
