import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword {
  validate(FormGroup: FormGroup) {
    const { password, passwordConfirmation } = FormGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return {
        passwordsDontMatch: true,
      };
    }
  }
}
