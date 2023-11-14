import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/modules/core/services/user.service';
import { IChangePasswordForm } from 'src/app/modules/shared/interfaces/forms.interfaces';
import { CustomValidators } from 'src/app/modules/shared/validators/custom-validators';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent implements OnInit {
  protected formGroup!: FormGroup<IChangePasswordForm>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  get passwordGroupControls() {
    return this.controls.passwordGroup.controls;
  }
  get controls() {
    return this.formGroup.controls;
  }

  createForm() {
    this.formGroup = this.fb.nonNullable.group({
      currentPassword: ['', [Validators.required]],
      passwordGroup: this.fb.nonNullable.group(
        {
          password: [
            '',
            [Validators.required, CustomValidators.strongPassword],
          ],
          passwordConfirmation: ['', Validators.required],
        },
        { validators: CustomValidators.passwordCinformationCorrect }
      ),
    });
  }

  submitHandler() {
    if (this.formGroup.valid) {
      const {
        currentPassword: password,
        passwordGroup: {
          password: newPassword,
          passwordConfirmation,
        } = this.formGroup.controls.passwordGroup.getRawValue(),
      } = this.formGroup.getRawValue();

      this.userService
        .changePassword({
          password,
          newPassword,
          passwordConfirmation,
        })
        .subscribe((res) => {
          console.log('GHGH');
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password changed successfully',
          });
          this.formGroup.reset();
        });
    }
  }
}
