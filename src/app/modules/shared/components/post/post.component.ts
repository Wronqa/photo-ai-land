import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from 'src/app/modules/core/services/user.service';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/modules/store/user/user.selectors';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  protected user!: IUser;
  private tempUsername = 'wronka';
  @Input() post!: IPost;
  @Output() deletePostHandle = new EventEmitter<string>();
  protected photos!: any;
  protected dialogVisibe = false;
  protected myUser!: IUser;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.photos = this.post.img.map((img: any) => {
      return { url: img.url };
    });

    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) this.myUser = user;
    });

    this.userService
      .getUser(this.post.username)
      .subscribe((res) => (this.user = res));
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
}
