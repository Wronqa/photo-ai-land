import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IPost } from '../../interfaces/post.interfaces';
import { Store, select } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';
import { selectUser } from 'src/app/modules/store/user/user.selectors';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent {
  @Input() post!: IPost;
  protected myUser!: IUser;
  protected comment!: string;

  constructor(private postService: PostService, private store: Store) {}

  ngOnInit() {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) this.myUser = user;
    });
  }

  submitHandler() {
    this.postService
      .commentPost(this.post._id, this.comment)
      .subscribe((res: IPost) => {
        this.post.comments = res.comments;
        this.comment = '';
      });
  }
}
