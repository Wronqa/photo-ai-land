import { Component, Input } from '@angular/core';
import { IComment } from '../../interfaces/post.interfaces';
import { UserService } from 'src/app/modules/core/services/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: IComment;
  protected user!: IUser;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(this.comment.user).subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    console.log(this.comment);
  }
}
