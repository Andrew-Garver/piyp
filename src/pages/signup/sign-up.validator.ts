import {FormControl} from '@angular/forms';
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class SignUpValidator {

  constructor(private http: Http) {

  }

  validateDOB(control: FormControl): any {
    if (control.value != '') {
      let givenDate = new Date(control.value);
      givenDate.setMinutes(givenDate.getMinutes() + givenDate.getTimezoneOffset());

      let currentDate = new Date();
      let eighteenYearsAgo = new Date().setFullYear(currentDate.getUTCFullYear() - 18);

      if (new Date(givenDate).getTime() > new Date(eighteenYearsAgo).getTime()) {
        return {"under 18": true};
      }

      return null;
    }
  }

  validateEmail(control: FormControl): any {
    return new Promise((resolve, reject) => {
      if (!/[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}/.test(control.value)) {
        resolve({
          "invalid email": true
        });
      }
      else {
        this.http.post('http://localhost:3000/api/registration/checkemail', {email: control.value})
          .map(res => res.json())
          .subscribe(
            data => {
              if (data.emailInUse) {
                resolve({
                  "email in use": true
                });
              }
              else {
                resolve(null);
              }
            },
            error => {
              console.log(error);
              reject(error);
            }
          );
      }
    });
  }

  validateCreditCard(control: FormControl): any {
    let luhnChk = (function (arr) {
      return function (ccNum) {
        var
          len = ccNum.length,
          bit = 1,
          sum = 0,
          val;

        while (len) {
          val = parseInt(ccNum.charAt(--len), 10);
          sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
      };
    }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

    let stringVal = control.value ? control.value.toString() : "";
    console.log(luhnChk(stringVal));
    if (luhnChk(stringVal)) {
      return null;
    }
    else {
      return {"invalid credit card": true};
    }
  }
}
