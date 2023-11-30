import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectUser } from 'src/app/modules/store/user/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  protected dialogVisibe = false;
  protected username!: string;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'News',
        icon: 'pi pi-fw pi-file',
      },

      {
        label: 'Friends',
        icon: 'pi pi-fw pi-user-edit',
        command: () => this.toogleModalVisibility(),
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },
    ];
  }
  toogleModalVisibility() {
    this.dialogVisibe = !this.dialogVisibe;
  }
  logout() {
    this.userService.logout().subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logout successfully!',
      });
      this.router.navigate(['/auth']);
    });
  }
}
