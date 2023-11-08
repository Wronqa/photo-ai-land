import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IApiResponse } from '../../shared/interfaces/api.interfaces';
import { Observable, map } from 'rxjs';
import { IPost } from '../../shared/interfaces/post.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getTimelinePosts() {
    return this.http.get<IPost[]>('/api/post');
  }
  getProfilePosts(username = 'Wronka69') {
    return this.http.get<IPost[]>(`/api/post/${username}`);
  }
  likePost(id: string) {
    return this.http.put(`/api/post/like/${id}`, {});
  }
  uploadPost(post: IPost) {
    return this.http.post('/api/post', post);
  }
}
