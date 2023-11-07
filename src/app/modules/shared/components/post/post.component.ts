import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  private tempUsername = 'wronka';
  @Input() post!: IPost;

  likeHandler() {
    this.checkLiked() ? this.removeLike() : this.addLike();
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
