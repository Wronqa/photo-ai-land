import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { IPhotoRes } from '../../interfaces/api.interfaces';
import { FileUpload } from 'primeng/fileupload';
import { Store, select } from '@ngrx/store';

import {
  selectProfilePhoto,
  selectUser,
} from 'src/app/modules/store/user/user.selectors';
import { editSuccess } from 'src/app/modules/store/user/user.actions';
import { tap, concatMap } from 'rxjs';
import { UserService } from 'src/app/modules/core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

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
  photo!: string;
  user!: IUser;
  myUser!: IUser;
  uploadedFiles: any;

  constructor(
    private profileService: ProfileService,
    private store: Store,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(concatMap(({ username }) => this.userService.getUser(username)))
      .subscribe((user) => {
        console.log(user);
        console.log(user.coverPicture);
        if (user) {
          this.user = user;
          this.photo = user.profilePicture;
        }
      });

    this.store.pipe(select(selectUser)).subscribe((user) => {
      if (user) {
        this.myUser = user;
      }
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
            editSuccess({ data: this.photo, property: '_profilePicture' })
          );
        }),
        concatMap((res) => this.userService.updateProfilePhoto(res[0].url))
      )
      .subscribe(() => {
        console.log('Gut');
      });
  }
}
