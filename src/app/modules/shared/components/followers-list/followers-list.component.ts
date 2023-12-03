import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { concatMap, forkJoin } from 'rxjs';
import { selectUser } from 'src/app/modules/store/user/user.selectors';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.scss'],
})
export class FollowersListComponent {
  protected followings: IUser[] = [];
  constructor(private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectUser))
      .pipe(
        concatMap((user: IUser) => {
          return forkJoin(
            user.followers.map((username) => this.userService.getUser(username))
          );
        })
      )
      .subscribe((users) => {
        console.log(users);
        this.followings = users;
      });
  }
}
