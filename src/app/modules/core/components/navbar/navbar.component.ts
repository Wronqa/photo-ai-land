import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/modules/store/user/user.selectors';
import { IUser } from 'src/app/modules/shared/interfaces/user.interface';
import { loginSuccess } from 'src/app/modules/store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  protected dialogVisibe = false;
  protected dialogFollowersVisible = false;
  protected username!: string;
  protected myUser!: IUser | null;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) {
        this.myUser = user;
        this.items = [
          {
            label: 'PhotoAi Land',
            routerLink: '/',
          },

          {
            label: 'News',
            icon: 'pi pi-fw pi-file',
            routerLink: '/timeline',
          },

          {
            label: 'Followers',
            icon: 'pi pi-fw pi-user-edit',
            command: () => this.toogleModalVisibility(),
          },
          {
            label: 'Followings',
            icon: 'pi pi-fw pi-user-edit',
            command: () => this.toogleModalFollowersVisibility(),
          },
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {
              this.router.navigate(['profile/user/' + this.myUser?.username]);
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.logout(),
          },
        ];
      } else {
        this.hideItems();
      }
    });
  }

  hideItems() {
    this.items = [
      {
        label: 'PhotoAi Land',
      },
    ];
  }
  toogleModalVisibility() {
    this.dialogVisibe = !this.dialogVisibe;
  }
  toogleModalFollowersVisibility() {
    this.dialogFollowersVisible = !this.dialogFollowersVisible;
  }
  logout() {
    this.userService.logout().subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logout successfully!',
      });

      this.router.navigate(['/auth']);
      this.myUser = null;
      this.hideItems();
    });
  }
}
