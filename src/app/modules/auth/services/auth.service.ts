import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import {
  ISignInValues,
  ISignUpValues,
} from '../../shared/interfaces/auth.interfaces';
import { IApiResponse } from '../../shared/interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(formData: ISignUpValues) {
    return this.http.post<IApiResponse>(
      environment.API_URL + '/auth/register',
      formData
    );
  }
  signIn(formData: ISignInValues) {
    return this.http.post<IApiResponse>(
      environment.API_URL + '/auth/login',
      formData
    );
  }
}
