import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

import { Message, MessageService } from 'primeng/api';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MenubarModule } from 'primeng/menubar';
import { UserService } from '../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Router, Routes } from '@angular/router';
import { SearchBarComponent } from './search-bar.component';
import { AuthComponent } from '../../../auth/auth.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('SearchbarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let userService: UserService;
  let messageService: MessageService;
  let router: Router;

  let routes: Routes = [
    { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        StoreModule,
        MenubarModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [MessageService, provideMockStore({}), UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should ngOnInit assing value poperty', () => {
    component.ngOnInit();
    expect(component['value']).not.toBeNull();
  });
  it('should searchUser run service method', () => {
    let spy = spyOn(userService, 'searchUser').and.callThrough();

    component.searchUser('test');
    expect(spy).toHaveBeenCalled();
  });
  it('should searchUser return value', () => {
    let userMock = [
      {
        username: 'test',
        email: 'test',
        profilePicture: 'test',
        coverPicture: 'test',
        followers: ['test'],
        followings: ['test'],
      },
    ];
    let spy = spyOn(userService, 'searchUser').and.returnValue(of(userMock));

    component.searchUser('test');
    expect(component['users']).toEqual(userMock);
  });
  it('should clearTable clear user property', () => {
    component.clearTable();
    expect(component['users']).toEqual([]);
  });
});
