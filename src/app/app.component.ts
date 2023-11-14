import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUser } from './modules/store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'photo-ai-land';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getUser());
  }
}
