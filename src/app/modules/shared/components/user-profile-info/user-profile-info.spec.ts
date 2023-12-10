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

describe('PopularBlogsComponent', () => {
  let component: UserProfileInfoComponent;
  let fixture: ComponentFixture<UserProfileInfoComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileInfoComponent, UserProfileInfoComponent],
      imports: [GalleriaModule, HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileInfoComponent);
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should correctly pass props', () => {
    expect(component['user']).toEqual({
      username: 'test',
      email: 'test',
      profilePicture: 'test',
      coverPicture: 'test',
      followers: ['test'],
      followings: ['test'],
    });
  });
});
