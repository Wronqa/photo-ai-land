import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  formGroup!: FormGroup;
  text!: string;
  uploadedFiles: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.formBuilder.group({
      title: [''],
      subtitle: [''],
      desc: [],
    });
  }

  handleSubmit() {
    console.log(this.formGroup.value);
  }
}
