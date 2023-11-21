import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  generateArticle(prompt: string) {
    console.log(prompt);
    return this.http.post('/api/ai', { prompt });
  }
}
