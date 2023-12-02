import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';
import { PostService } from 'src/app/modules/core/services/post.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  @Input() posts: IPost[] = [];

  deletePost(id: string) {
    this.posts = this.posts.filter((post) => post._id !== id);
  }
}
