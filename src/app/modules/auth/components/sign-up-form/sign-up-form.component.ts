import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ISignUpForm,
  ISignUpValues,
} from 'src/app/modules/shared/interfaces/form.interfaces';
import { CustomValidators } from 'src/app/modules/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', '../../shared-styles.scss'],
})
export class SignUpFormComponent implements OnInit {
  protected form!: FormGroup<ISignUpForm>;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      passwordGroup: this.fb.nonNullable.group(
        {
          password: [
            '',
            [Validators.required, CustomValidators.strongPassword],
          ],
          passwordConfirmation: ['', Validators.required],
        },
        { validators: [CustomValidators.passwordCinformationCorrect] }
      ),
    });
  }

  get controls() {
    return this.form.controls;
  }

  get passwordGroupControls() {
    return this.controls.passwordGroup.controls;
  }
  submitHandler() {
    if (this.form.valid) {
      const {
        username,
        passwordGroup: { password } = {},
        email,
      } = this.form.value;

      this.authService
        .signUp({ username, password, email } as ISignUpValues)
        .subscribe(() => {
          console.log('halo');
        });
    }
  }
}
