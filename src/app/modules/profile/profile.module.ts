import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';

import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, ButtonModule, DialogModule],
})
export class ProfileModule {}
