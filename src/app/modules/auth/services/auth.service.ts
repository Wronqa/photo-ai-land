import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ISignUpValues } from '../../shared/interfaces/auth.interfaces';
import { IApiResponse } from '../../shared/interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(formData: ISignUpValues) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:5000',
      }),
    };

    return this.http.post<IApiResponse>(
      environment.API_URL + '/auth/register',
      formData
    );
  }
}
