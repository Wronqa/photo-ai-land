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
import { concatMap, tap } from 'rxjs';
import { UserService } from 'src/app/modules/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/modules/shared/interfaces/user.interface';

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
  user!: IUser;
  param!: string;
  myUser!: IUser;
  photo =
    'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg';
  uploadedFiles: any;

  constructor(
    private profileService: ProfileService,
    private store: Store,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        concatMap(({ username }) => {
          this.param = username;
          return this.userService.getUser(username);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.photo =
            user.coverPicture === 'default_cover.png'
              ? 'https://timelinecovers.pro/facebook-cover/download/life-cycle-facebook-cover.jpg'
              : user.coverPicture;
        }
      });

    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) this.myUser = user;
    });
  }

  onUpload(event: UploadEvent, fileUpload: FileUpload) {
    this.uploadedFiles = event.files[0];

    this.profileService
      .uploadPostPhotos(this.uploadedFiles)
      .pipe(
        tap((res: IPhotoRes[]) => {
          fileUpload.clear();
          this.photo = res[0].url;

          this.store.dispatch(
            editSuccess({ data: this.photo, property: '_coverPicture' })
          );
        }),
        concatMap((res) => this.userService.updateCoverPhoto(res[0].url))
      )
      .subscribe(() => {
        console.log('Gut');
      });
  }
}
