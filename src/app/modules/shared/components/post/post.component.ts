import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';
import { PostService } from 'src/app/modules/core/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  private tempUsername = 'wronka';
  @Input() post!: IPost;
  protected photos!: any;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.photos = this.post.img.map((img: any) => {
      return { url: img.url };
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
