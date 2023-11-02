import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUpForm } from 'src/app/modules/shared/interfaces/forms.interfaces';
import { CustomValidators } from 'src/app/modules/shared/validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/modules/shared/interfaces/api.interfaces';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', '../../shared-styles.scss'],
})
export class SignUpFormComponent implements OnInit {
  @Output() switchToSignIn = new EventEmitter();
  protected form!: FormGroup<ISignUpForm>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

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
        passwordGroup: {
          password,
        } = this.form.controls.passwordGroup.getRawValue(),
        email,
      } = this.form.getRawValue();

      this.authService
        .signUp({ username, password, email })
        .subscribe((res: IApiResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });

          this.switchToSignIn.emit();
          this.form.reset();
          this.form.setErrors(null);
        });
    }
  }
}
