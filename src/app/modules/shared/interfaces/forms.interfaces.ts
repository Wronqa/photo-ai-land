import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export interface ISignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
export interface ISignUpForm {
  email: FormControl<string>;
  username: FormControl<string>;
  passwordGroup: FormGroup<IPasswordGroup>;
}
export interface IChangePasswordForm {
  currentPassword: FormControl<string>;
  passwordGroup: FormGroup<IPasswordGroup>;
}
export interface IChangeProfileDataForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
interface IPasswordGroup {
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
}
