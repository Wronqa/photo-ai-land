import { FormGroup } from '@angular/forms';

export const clearForm = (form: FormGroup) => {
  Object.keys(form.controls).forEach((key: any) => {
    console.log(typeof key);
    if (form.controls[key] instanceof FormGroup) {
      form.controls[key].setErrors(null);
      Object.keys((form.controls[key] as FormGroup).controls).forEach(
        (subKey: any) => {
          (form.controls[key] as FormGroup).controls[subKey].setErrors(null);
        }
      );
    }
    form.controls[key].setErrors(null);
  });
};
