import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { PostService } from '../core/services/post.service';
import { IPost } from '../shared/interfaces/post.interfaces';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  protected posts: IPost[] = [];
  protected dialogVisibe = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        mergeMap(({ username }) => {
          return this.postsService.getProfilePosts(username);
        })
      )
      .subscribe((posts) => {
        console.log(posts);
        this.posts = posts;
      });
  }

  toogleModalVisibility(post?: any) {
    post && this.posts.push(post);
    this.dialogVisibe = !this.dialogVisibe;
  }
}
