import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/core/services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { selectUser } from 'src/app/modules/store/user/user.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  username!: string;
  users: IUser[] = [];

  constructor(private userService: UserService, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.userService
          .getFriends(this.username)
          .subscribe((res) => (this.users = res));
      }
    });
  }
}
