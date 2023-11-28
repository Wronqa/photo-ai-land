import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';
import { PostService } from 'src/app/modules/core/services/post.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  protected user!: IUser;
  private tempUsername = 'wronka';
  @Input() post!: IPost;
  protected photos!: any;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.photos = this.post.img.map((img: any) => {
      return { url: img.url };
    });

    this.userService
      .getUser(this.post.username)
      .subscribe((res) => (this.user = res));
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
