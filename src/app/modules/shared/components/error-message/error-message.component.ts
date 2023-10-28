import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { errorMessages } from '../../constants/messages/errors-messages';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control!: FormControl<any> | AbstractControl<any>;
  protected errorMessages = errorMessages;

  constructor(public formDirective: FormGroupDirective) {}
}
