import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, mergeMap } from 'rxjs';
import { PostService } from '../core/services/post.service';
import { IPost } from '../shared/interfaces/post.interfaces';
import { UserService } from '../core/services/user.service';
import { IUser } from '../shared/interfaces/user.interface';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../store/user/user.selectors';
import { MessageService } from 'primeng/api';
import { loginSuccess } from '../store/user/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  protected posts: IPost[] = [];
  protected user!: IUser;
  protected dialogVisibe = false;
  protected dialogStatsVisibe = false;
  username!: string;
  isFollowed!: boolean;
  myUser!: IUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostService,
    private userService: UserService,
    private store: Store,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        concatMap(({ username }) => {
          this.username = username;
          return this.userService.getUser(username);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
    this.activatedRoute.params
      .pipe(
        concatMap(({ username }) => {
          this.username = username;
          return this.userService.getUser(username);
        })
      )
      .subscribe(() =>
        this.store.pipe(select(selectUser)).subscribe((user) => {
          if (user) {
            this.myUser = user;
            this.isFollowed = this.myUser.followings.includes(this.username);
          }
        })
      );

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
  toogleModalVisibilityForStats() {
    this.dialogStatsVisibe = !this.dialogStatsVisibe;
  }
  followUser() {
    this.userService.followUser(this.username).subscribe((res) => {
      this.store.dispatch(loginSuccess({ user: res }));
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation success!',
      });
    });
  }
}
