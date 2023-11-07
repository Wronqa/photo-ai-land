import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'PhotoAiLand',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'News',
        icon: 'pi pi-fw pi-file',
      },

      {
        label: 'Friends',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }
}
