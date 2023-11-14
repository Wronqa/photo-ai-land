import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/modules/core/services/user.service';
import {
  IChangePasswordForm,
  IChangeProfileDataForm,
} from 'src/app/modules/shared/interfaces/forms.interfaces';
import { CustomValidators } from 'src/app/modules/shared/validators/custom-validators';
import { selectUser } from 'src/app/modules/store/user/user.selectors';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent implements OnInit {
  protected formGroup!: FormGroup<IChangeProfileDataForm>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.store
      .select(selectUser)
      .subscribe((user) => user && this.loadData(user.email));
  }

  createForm() {
    this.formGroup = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.strongPassword]],
    });
  }

  loadData(email: string) {
    console.log(email);
    this.controls['email'].setValue(email);
  }

  get controls() {
    return this.formGroup.controls;
  }

  submitHandler() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.getRawValue();
      this.userService.changeEmail({ email, password }).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Email changed successfully',
        });
        this.formGroup.reset();
      });
    }
  }
}
