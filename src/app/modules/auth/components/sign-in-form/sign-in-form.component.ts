import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ISignInForm } from 'src/app/modules/shared/interfaces/form.interfaces';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../../shared-styles.scss'],
})
export class SignInFormComponent {
  protected form!: FormGroup<ISignInForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get controls() {
    return this.form.controls;
  }

  submitHandler() {}
}
