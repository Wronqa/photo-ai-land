import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IPost } from '../../interfaces/post.interfaces';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() post!: IPost;
  protected comment!: string;

  constructor(private postService: PostService) {}

  submitHandler() {
    this.postService
      .commentPost(this.post._id, this.comment)
      .subscribe((res: IPost) => {
        this.post.comments = res.comments;
      });
  }
}
