import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FileUpload } from 'primeng/fileupload';
import { IPhotoRes } from 'src/app/modules/shared/interfaces/api.interfaces';

import {
  selectProfilePhoto,
  selectUser,
} from 'src/app/modules/store/user/user.selectors';
import { ProfileService } from '../../services/profile.service';
import { editSuccess } from 'src/app/modules/store/user/user.actions';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-cover-photo',
  templateUrl: './cover-photo.component.html',
  styleUrls: ['./cover-photo.component.scss'],
})
export class CoverPhotoComponent {
  photo =
    'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg';
  uploadedFiles: any;

  constructor(private profileService: ProfileService, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe((user) => {
      console.log(user);
      console.log(user.coverPicture);
      if (user)
        this.photo =
          user.coverPicture === 'default_cover.png'
            ? 'https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'
            : user.coverPicture;
    });
  }

  onUpload(event: UploadEvent, fileUpload: FileUpload) {
    this.uploadedFiles = event.files[0];

    this.profileService
      .uploadPostPhotos(this.uploadedFiles)
      .subscribe((res: IPhotoRes[]) => {
        fileUpload.clear(); // this will clear your file
        this.photo = res[0].url;

        this.store.dispatch(
          editSuccess({ data: this.photo, property: '_coverPicture' })
        );
      });
  }
}
