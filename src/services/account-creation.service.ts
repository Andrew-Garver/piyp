import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var Stripe: any;

@Injectable()
export class AccountCreationService {

  constructor(private http: Http) {}

  //TODO: Verify this endpoint
  createAccount(accountInfo): Promise<string> {
    return Promise.resolve("imatokenyo");
    // return new Promise((resolve, reject) => {
    //   this.http.post('localhost:3000/api/registration/register', {accountInfo: JSON.stringify(userInfo)})
    //     .map(res => res.json())
    //     .subscribe(
    //       data => {
    //         localStorage.setItem('access_token', data.access_token);
    //         localStorage.setItem('refresh_token', data.refresh_token);
    //         resolve(data.refresh_token);
    //       },
    //       error => {
    //         console.log(error);
    //         reject(error);
    //       }
    //     );
    // });
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
