import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [ProfileComponent, AddPostComponent],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    FormsModule,
    InputTextModule,
    FileUploadModule,
    TagModule,
  ],
})
export class ProfileModule {}
