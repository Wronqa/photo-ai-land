import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ValidationPipe } from './pipes/validation.pipe';

@NgModule({
  declarations: [ErrorMessageComponent, ValidationPipe],
  imports: [CommonModule],
  exports: [ErrorMessageComponent, ValidationPipe],
})
export class SharedModule {}
