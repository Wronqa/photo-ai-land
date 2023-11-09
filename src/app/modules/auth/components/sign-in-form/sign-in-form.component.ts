import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ISignInForm } from 'src/app/modules/shared/interfaces/forms.interfaces';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/modules/store/user/user.actions';
import { selectUser } from 'src/app/modules/store/user/user.selectors';
import { User } from 'src/app/modules/shared/models/User';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../../shared-styles.scss'],
})
export class SignInFormComponent {
  protected form!: FormGroup<ISignInForm>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get controls() {
    return this.form.controls;
  }

  submitHandler() {
    if (this.form.valid) {
      const { password, email } = this.form.getRawValue();

      this.store.dispatch(login({ email, password }));
      this.store.select(selectUser).subscribe((user: User | null) => {
        console.log(user);
        if (user) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged successfully!',
          });

          this.router.navigate(['/home']);
        }
      });
    }
  }
}
