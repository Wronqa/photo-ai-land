import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  IEmailChange,
  IPasswords,
  IUser,
} from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  changePassword(formData: IPasswords) {
    return this.http.post(`/api/user/password`, formData);
  }
  changeEmail(formData: IEmailChange) {
    return this.http.put('/api/user/email', formData);
  }
  updateCoverPhoto(url: string) {
    return this.http.put('/api/user/update/cover', { coverPicture: url });
  }
  updateProfilePhoto(url: string) {
    return this.http.put('/api/user/update/profile', { profilePicture: url });
  }
  getUser(username: string) {
    return this.http.get<IUser>(`/api/user/profile/${username}`);
  }
}
