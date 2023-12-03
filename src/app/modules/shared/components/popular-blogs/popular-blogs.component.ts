import { Component } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from 'src/app/modules/core/services/user.service';

@Component({
  selector: 'app-popular-blogs',
  templateUrl: './popular-blogs.component.html',
  styleUrls: ['./popular-blogs.component.scss'],
})
export class PopularBlogsComponent {
  protected users: IUser[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getPopularUser().subscribe((users) => {
      this.users = users;
    });
  }
}
