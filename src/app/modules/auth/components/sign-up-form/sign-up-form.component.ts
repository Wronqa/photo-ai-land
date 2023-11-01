import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUpForm } from 'src/app/modules/shared/interfaces/form.interfaces';
import { CustomValidators } from 'src/app/modules/shared/validators/custom-validators';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', '../../shared-styles.scss'],
})
export class SignUpFormComponent implements OnInit {
  protected form!: FormGroup<ISignUpForm>;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.form.value);
  }
}
