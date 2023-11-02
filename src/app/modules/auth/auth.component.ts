import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', './shared-styles.scss'],
})
export class AuthComponent {
  activeClass = false;

  toogleActive() {
    this.activeClass = !this.activeClass;
  }
  test() {
    alert('xfd');
  }
}
