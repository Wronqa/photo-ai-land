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

@NgModule({
  declarations: [
    ErrorMessageComponent,
    ValidationPipe,
    PostComponent,
    FeedComponent,
    ModalComponent,
    CommentComponent,
  ],
  imports: [CommonModule, CardModule, ButtonModule, DialogModule],
  exports: [
    ErrorMessageComponent,
    ValidationPipe,
    PostComponent,
    FeedComponent,
    ModalComponent,
    CommentComponent,
  ],
})
export class SharedModule {}
