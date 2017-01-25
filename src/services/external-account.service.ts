import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthHttp} from "angular2-jwt";

declare var Stripe: any;

@Injectable()
export class ExternalAccountService {

  constructor(private http: Http, private authHttp: AuthHttp) {}

  linkExternalAccount(profileId, token): Promise<any> {
    console.log("TOKEN: " + token);
    return new Promise((resolve, reject) => {
      this.authHttp.post('http://localhost:3000/api/user/profile/' + profileId, {externalAccountToken: token})
        .map(res => res.json())
        .subscribe(
          data => {
            localStorage.setItem('current_profile', JSON.stringify(data.profile));
            resolve(data);
          },
          error => {
            console.log("Failed: Did not link external account.");
            console.log(error);
            reject(error);
          }
        );
    });
  }

  createBankToken(bankInfo): Promise<string> {
    return new Promise((resolve, reject) => {
      Stripe.setPublishableKey('pk_test_qYKaD4TLqQdNtStg3FZ237uL');
      Stripe.bankAccount.createToken({
        country: "US",
        currency: "USD",
        routing_number: bankInfo.routingNumber,
        account_number: bankInfo.accountNumber,
        account_holder_name: bankInfo.accountHolderName,
        account_holder_type: bankInfo.accountHolderType
      }, (status, response) => {
        this.stripeResponseHandler(status, response, resolve, reject);
      });
    });
  }

  stripeResponseHandler(status, response, resolve, reject) {
    if (response.error) {
      console.log("error getting bank token from Stripe!");
      reject(response.error.message);
    }
    else {
      console.log("token retrieved successfully!");
      resolve(response.id);
    }
  }

}
