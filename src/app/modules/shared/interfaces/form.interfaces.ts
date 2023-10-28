import { AbstractControl, FormControl } from '@angular/forms';

export interface ISignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
