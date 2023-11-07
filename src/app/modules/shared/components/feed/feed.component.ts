import { Component } from '@angular/core';
import { postMock } from 'src/app/modules/timeline/POST_MOCKS';
import { IPost } from '../../interfaces/post.interfaces';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  protected posts: IPost[] = [];

  constructor() {
    this.posts = postMock;
  }
}
