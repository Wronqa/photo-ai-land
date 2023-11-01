import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { patterns } from '../constants/messages/patterns';

export class CustomValidators {
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const forbidden = new RegExp(patterns.strongPassword).test(control.value);
    return forbidden ? null : { weak: true };
  }

  static passwordCinformationCorrect(
    group: AbstractControl
  ): ValidationErrors | null {
    console.log(group);
    const password = (group as FormGroup).controls['password'];
    const passwordConfirmation = (group as FormGroup).controls[
      'passwordConfirmation'
    ];

    if (passwordConfirmation.untouched) return null;

    return password.value === passwordConfirmation.value
      ? null
      : { passwordsNotTheSame: true };
  }
}
