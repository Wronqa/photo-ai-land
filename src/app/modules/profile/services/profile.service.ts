import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhotoRes } from '../../shared/interfaces/api.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  uploadPostPhotos(file: any): Observable<IPhotoRes[]> {
    console.log(file);
    let testData: FormData = new FormData();

    testData.append('image', file, file.name);

    return this.http.post<IPhotoRes[]>('/api/upload', testData);
  }
}
