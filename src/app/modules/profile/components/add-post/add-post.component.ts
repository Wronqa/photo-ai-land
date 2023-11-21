import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { map, switchMap, tap } from 'rxjs';
import { AiService } from 'src/app/modules/core/services/ai.service';
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
  protected aiSectionVisible = false;
  formGroup!: FormGroup;
  text!: string;
  uploadedFiles: any[] = [];
  protected prompt!: string;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private messageService: MessageService,
    private aiService: AiService
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

  showAiSection() {
    this.aiSectionVisible = true;
  }

  onUpload(event: UploadEvent) {
    console.log(event.files);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  get controls() {
    return this.formGroup.controls;
  }

  handleSubmit() {
    if (this.formGroup.valid) {
      this.postService
        .uploadPostPhotos(this.uploadedFiles)
        .pipe(
          map((photos: any) => {
            this.formGroup.addControl('img', this.formBuilder.control(photos));
          }),
          switchMap(() => {
            const post = this.formGroup.getRawValue();
            return this.postService.uploadPost(post);
          })
        )
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Post created',
          });
          this.closeFn.emit();
        });
    }
    // if (this.formGroup.valid) {
    //   const post = this.formGroup.getRawValue();

    // }
  }

  protected generateArticle() {
    this.aiService.generateArticle(this.prompt).subscribe((res) => {
      this.controls['desc'].setValue(res);
    });
  }
}
