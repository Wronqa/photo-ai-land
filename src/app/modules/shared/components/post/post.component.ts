import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from 'src/app/modules/core/services/user.service';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/modules/store/user/user.selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  protected views = 0;
  protected user!: IUser;
  private tempUsername = 'wronka';
  @Input() post!: IPost;
  @Output() deletePostHandle = new EventEmitter<string>();
  protected photos!: any;
  protected dialogVisibe = false;
  protected myUser!: IUser;
  protected timeAgo!: string;
  protected commentVisible = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const views = window.localStorage.getItem(this.post._id);

    if (!views) {
      window.localStorage.setItem(this.post._id, JSON.stringify({ views: 0 }));
    } else {
      const newViews = JSON.parse(views);
      console.log(newViews);
      window.localStorage.setItem(
        this.post._id,
        JSON.stringify({ views: newViews.views + 1 })
      );
      this.views = newViews.views + 1;
    }

    this.photos = this.post.img.map((img: any) => {
      return { url: img.url };
    });

    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) this.myUser = user;
    });

    this.userService
      .getUser(this.post.username)
      .subscribe((res) => (this.user = res));

    this.timeAgo = moment(this.post.createdAt).fromNow();
  }
  toogleModalVisibility(post?: any) {
    this.dialogVisibe = !this.dialogVisibe;
  }
  deletePost() {
    this.postService.deletePost(this.post._id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post has been deleted',
      });
      this.toogleModalVisibility();
      this.deletePostHandle.emit(this.post._id);
    });
  }
  likeHandler() {
    console.log(this.post);
    this.postService.likePost(this.post._id).subscribe(() => {
      this.checkLiked() ? this.removeLike() : this.addLike();
    });
  }
  removeLike() {
    this.post.likes = this.post.likes.filter((x) => x !== this.tempUsername);
  }
  addLike() {
    this.post.likes.push(this.tempUsername);
  }
  checkLiked() {
    return this.post.likes.includes(this.tempUsername);
  }
  toggleVisible() {
    this.commentVisible = !this.commentVisible;
  }
}
