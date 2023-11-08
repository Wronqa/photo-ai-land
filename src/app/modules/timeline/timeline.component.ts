import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/interfaces/post.interfaces';
import { PostService } from '../core/services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  protected posts: IPost[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getTimelinePosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    });
  }
}
