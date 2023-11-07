import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  protected dialogVisibe = false;

  toogleModalVisibility() {
    this.dialogVisibe = !this.dialogVisibe;
  }
}
