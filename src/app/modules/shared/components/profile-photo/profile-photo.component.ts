import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { IPhotoRes } from '../../interfaces/api.interfaces';
import { FileUpload } from 'primeng/fileupload';
import { Store, select } from '@ngrx/store';

import { selectProfilePhoto } from 'src/app/modules/store/user/user.selectors';
import { editSuccess } from 'src/app/modules/store/user/user.actions';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent implements OnInit {
  photo =
    'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg';
  uploadedFiles: any;

  constructor(private profileService: ProfileService, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(selectProfilePhoto)).subscribe((photo) => {
      if (photo) this.photo = photo;
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
          editSuccess({ data: this.photo, property: '_profilePicture' })
        );
      });
  }
}
