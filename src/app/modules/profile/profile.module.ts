import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { AddPostComponent } from './components/add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { CoverPhotoComponent } from './components/cover-photo/cover-photo.component';
import { EditDetailsComponent } from './components/edit-details/edit-details.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AddPostComponent,
    CoverPhotoComponent,
    EditDetailsComponent,
    ChangePasswordFormComponent,
    EditProfileFormComponent,
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    SharedModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    FormsModule,
    InputTextModule,
    FileUploadModule,
    TagModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
