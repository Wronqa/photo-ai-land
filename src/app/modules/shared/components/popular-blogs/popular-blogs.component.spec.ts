import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'primeng/api';
import { GalleriaModule } from 'primeng/galleria';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/User';
import { UserProfileInfoComponent } from '../user-profile-info/user-profile-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PopularBlogsComponent } from './popular-blogs.component';

describe('PopularBlogsComponent', () => {
  let component: PopularBlogsComponent;
  let fixture: ComponentFixture<PopularBlogsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularBlogsComponent, UserProfileInfoComponent],
      imports: [GalleriaModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularBlogsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    component['users'] = [
      {
        username: 'test',
        email: 'test',
        profilePicture: 'test',
        coverPicture: 'test',
        followers: ['test'],
        followings: ['test'],
      },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run servie method', () => {
    let spy = spyOn(userService, 'getPopularUser').and.callThrough();

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should run return data', () => {
    let spy = spyOn(userService, 'getPopularUser').and.returnValue(
      of([
        {
          username: 'test',
          email: 'test',
          profilePicture: 'test',
          coverPicture: 'test',
          followers: ['test'],
          followings: ['test'],
        },
      ])
    );

    component.ngOnInit();
    expect(component['users']).toEqual([
      {
        username: 'test',
        email: 'test',
        profilePicture: 'test',
        coverPicture: 'test',
        followers: ['test'],
        followings: ['test'],
      },
    ]);
  });
});
