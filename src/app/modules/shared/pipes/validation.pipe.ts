import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

interface IErrorMessages {
  [key: string]: string;
}

@Pipe({ name: 'validationPipe' })
export class ValidationPipe implements PipeTransform {
  transform(messages: IErrorMessages, errors: Object): string {
    return messages[Object.keys(errors)[0]];
  }
}
