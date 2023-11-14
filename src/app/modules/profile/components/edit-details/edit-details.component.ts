import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/modules/store/user/user.selectors';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent implements OnInit {
  protected formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) {
        this.controls['username'].setValue(user.username);
        this.controls['password'].setValue(user.password);
      }
    });
  }

  get controls() {
    return this.formGroup.controls;
  }

  createForm() {
    this.formGroup = this.fb.group({
      username: [''],
      password: [''],
      passwordConfirmation: [''],
    });
  }
}
