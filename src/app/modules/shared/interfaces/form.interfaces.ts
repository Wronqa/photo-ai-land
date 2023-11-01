import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export interface ISignUpValues {
  email: string;
  password: string;
  username: string;
}
export interface ISignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
export interface ISignUpForm {
  email: FormControl<string>;
  username: FormControl<string>;
  passwordGroup: FormGroup<IPasswordGroup>;
}
interface IPasswordGroup {
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
}
