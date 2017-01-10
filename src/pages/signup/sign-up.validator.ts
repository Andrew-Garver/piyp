import {FormControl} from '@angular/forms';

export class SignUpValidator {

  static validateDOB(control: FormControl): any {
    if (control.value != '') {
      let givenDate = new Date(control.value);
      givenDate.setMinutes(givenDate.getMinutes() + givenDate.getTimezoneOffset());

      let currentDate = new Date();
      let eighteenYearsAgo = new Date().setFullYear(currentDate.getUTCFullYear() - 18);

      if (new Date(givenDate).getTime() > new Date(eighteenYearsAgo).getTime()) {
        return {"under 18": true}
      }

      return null;
    }
  }
}
