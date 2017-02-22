import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

declare var Stripe: any;

@Injectable()
export class AccountCreationService {

  constructor(private http: Http, private authHttp: AuthHttp) {}

  createAccount(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/registration/register', body)
        .map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            resolve(true);
          },
          error => {
            console.log("createAccount Failed");
            console.log(error);
            reject(error);
          }
        );
    });
  }

  testPaymentInfo(paymentInfo): Promise<any> {
    return new Promise((resolve, reject) => {
      Stripe.setPublishableKey('pk_test_qYKaD4TLqQdNtStg3FZ237uL');
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
      console.log("token retrieved successfully!");
      resolve(response.id);
    }
  }

}
