import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PostService } from 'src/app/modules/core/services/post.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  @Output() closeFn = new EventEmitter();
  formGroup!: FormGroup;
  text!: string;
  uploadedFiles: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private messageService: MessageService
  ) {}

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

  onUpload(event: UploadEvent) {
    console.log(event.files);
    for (let file of event.files) {
      this.uploadedFiles = file;
    }
  }

  handleSubmit() {
    console.log(this.uploadedFiles);
    this.postService.uploadPostPhotos(this.uploadedFiles).subscribe((res) => {
      console.log(res);
    });
    // if (this.formGroup.valid) {
    //   const post = this.formGroup.getRawValue();

    //   this.postService.uploadPost(post).subscribe((res) => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Post created',
    //     });
    //     this.closeFn.emit();
    //   });
    // }
  }
}
