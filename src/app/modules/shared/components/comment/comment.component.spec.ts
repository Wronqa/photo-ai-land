import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';
import { CommentComponent } from './comment.component';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/User';
import { UserProfileInfoComponent } from '../user-profile-info/user-profile-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PhotoGalleryComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent, UserProfileInfoComponent],
      imports: [GalleriaModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    component['user'] = {
      username: 'test',
      email: 'test',
      profilePicture: 'test',
      coverPicture: 'test',
      followers: ['test'],
      followings: ['test'],
    };
    component['comment'] = {
      id: '0',
      user: 'test',
      desc: 'test',
      date: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit run service method', () => {
    let spy = spyOn(userService, 'getUser').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });
  it('should ngOnInit should run console log', () => {
    let spy = spyOn(console, 'log').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });
  it('should ngOnInit assign value to user', () => {
    let spy = spyOn(userService, 'getUser').and.returnValue(
      of({
        username: 'test',
        email: 'test',
        profilePicture: 'test',
        coverPicture: 'test',
        followers: ['test'],
        followings: ['test'],
      })
    );

    component.ngOnInit();

    expect(component['user']).toEqual({
      username: 'test',
      email: 'test',
      profilePicture: 'test',
      coverPicture: 'test',
      followers: ['test'],
      followings: ['test'],
    });
  });
  it('should ngOnInit create date', () => {
    let spy = spyOn(userService, 'getUser').and.returnValue(
      of({
        username: 'test',
        email: 'test',
        profilePicture: 'test',
        coverPicture: 'test',
        followers: ['test'],
        followings: ['test'],
      })
    );

    component.ngOnInit();

    expect(component['commentAgo']).not.toBeNull();
  });
});
