import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ValidationPipe } from './pipes/validation.pipe';
import { PostComponent } from './components/post/post.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FeedComponent } from './components/feed/feed.component';
import { ModalComponent } from './components/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { CommentComponent } from './components/comment/comment.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { FileUploadModule } from 'primeng/fileupload';
import { UserProfileInfoComponent } from './components/user-profile-info/user-profile-info.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';

import { GalleriaModule } from 'primeng/galleria';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FollowersListComponent } from './components/followers-list/followers-list.component';
import { PopularBlogsComponent } from './components/popular-blogs/popular-blogs.component';
import { StatsComponent } from './components/stats/stats.component';
@NgModule({
  declarations: [
    ErrorMessageComponent,
    ValidationPipe,
    PostComponent,
    FeedComponent,
    ModalComponent,
    CommentComponent,
    ProfilePhotoComponent,
    UserProfileInfoComponent,
    CommentFormComponent,
    SpinnerComponent,
    PhotoGalleryComponent,
    FriendsListComponent,
    FollowersListComponent,
    PopularBlogsComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    ProgressSpinnerModule,
    GalleriaModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    ErrorMessageComponent,
    ValidationPipe,
    PostComponent,
    FeedComponent,
    ModalComponent,
    CommentComponent,
    ProfilePhotoComponent,
    FileUploadModule,
    SpinnerComponent,
    UserProfileInfoComponent,
    FriendsListComponent,
    FollowersListComponent,
    PopularBlogsComponent,
    StatsComponent,
  ],
})
export class SharedModule {}
