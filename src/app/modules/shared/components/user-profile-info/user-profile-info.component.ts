import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss'],
})
export class UserProfileInfoComponent {
  @Input() user!: IUser;
}
