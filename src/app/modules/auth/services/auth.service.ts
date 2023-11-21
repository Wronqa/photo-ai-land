import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  ISignInValues,
  ISignUpValues,
} from '../../shared/interfaces/auth.interfaces';
import { IApiResponse } from '../../shared/interfaces/api.interfaces';
import { IUser } from '../../shared/interfaces/user.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(formData: ISignUpValues) {
    return this.http.post<IApiResponse>('/api/auth/register', formData);
  }
  signIn(formData: ISignInValues) {
    return this.http.post<IUser>('/api/auth/login', formData);
  }

  checkUser() {
    return this.http.get<IUser>('/api/auth/check');
  }
}
