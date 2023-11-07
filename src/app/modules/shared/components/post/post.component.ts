import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: IPost;
}
