import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent, SignInFormComponent, SignUpFormComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [AuthComponent],
})
export class AuthModule {}
