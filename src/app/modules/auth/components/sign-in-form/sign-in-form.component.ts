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

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../../shared-styles.scss'],
})
export class SignInFormComponent {
  protected form!: FormGroup<ISignInForm>;

  constructor(
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

      this.authService.signIn({ password, email }).subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged successfully!',
        });

        this.router.navigate(['/home']);
      });
    }
  }
}
