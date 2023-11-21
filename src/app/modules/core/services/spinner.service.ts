import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private _isLoading = new BehaviorSubject(false);

  constructor() {}

  activate() {
    this._isLoading.next(true);
  }
  dezactivate() {
    this._isLoading.next(false);
  }
  get isLoading() {
    return this._isLoading;
  }
}
