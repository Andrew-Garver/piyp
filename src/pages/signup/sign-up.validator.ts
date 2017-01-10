import {FormControl} from '@angular/forms';
import {DatabaseService} from "../../services/database.service";

export class SignUpValidator {

  static validateDOB(control: FormControl): any {
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

  static validateEmail(control: FormControl): any {
    return new Promise(resolve => {
      setTimeout(() => {
        if (new DatabaseService().getCustomerByEmail(control.value)) {
          resolve({
            "username taken": true
          });
        }
        else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
