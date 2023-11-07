import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, SharedModule],
})
export class TimelineModule {}
