import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Message, MessageService } from 'primeng/api';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MenubarModule } from 'primeng/menubar';

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { Router, Routes } from '@angular/router';
import { UserService } from 'src/app/modules/core/services/user.service';
import { PostComponent } from './post.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EventEmitter } from '@angular/core';
import { PostService } from 'src/app/modules/core/services/post.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let userService: UserService;
  let messageService: MessageService;
  let router: Router;
  let postService: PostService;

  let routes: Routes = [
    { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        DialogModule,
        FileUploadModule,
        FormsModule,
        ProgressSpinnerModule,
        GalleriaModule,
        FormsModule,
        HttpClientTestingModule,
        SharedModule,
        StoreModule,
        MenubarModule,
        ButtonModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        MessageService,
        provideMockStore({}),
        UserService,
        PostService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+
    messageService = TestBed.inject(MessageService);
    postService = TestBed.inject(PostService);
    component.post = {
      _id: '0',
      title: 'test',
      desc: 'test',
      createdAt: new Date(),
      img: [{ url: 'test' }],
      username: 'test',
      likes: ['test'],
      comments: [{ id: '0', user: 'test', desc: 'test', date: new Date() }],
      subtitle: 'test',
    };
    component.deletePostHandle = new EventEmitter();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('toggleVisible should toggle visibility', () => {
    let beforeValue = component['commentVisible'];

    component.toggleVisible();
    expect(component['commentVisible']).toBe(!beforeValue);
  });
  it('checkLiked should return false when object not containts user', () => {
    component['tempUsername'] = 'test2';

    expect(component.checkLiked()).toBe(false);
  });
  it('checkLiked should return true when object containts user', () => {
    component['tempUsername'] = 'test';

    expect(component.checkLiked()).toBe(true);
  });
  it('addLike should push to post likes user username', () => {
    component['tempUsername'] = 'test2';

    component.addLike();

    expect(component.post.likes.includes(component['tempUsername'])).toBe(true);
  });
  it('addLike should delete from  post likes user username', () => {
    component.post.likes.push('test2');
    component['tempUsername'] = 'test2';

    component.removeLike();

    expect(component.post.likes.includes(component['tempUsername'])).toBe(
      false
    );
  });
  it('likeHandler should run service method', () => {
    let spy = spyOn(postService, 'likePost').and.callThrough();

    component.likeHandler();

    expect(spy).toHaveBeenCalled();
  });
  it('deletePost should run service method', () => {
    let spy = spyOn(postService, 'deletePost').and.callThrough();

    component.deletePost();

    expect(spy).toHaveBeenCalled();
  });
  it('toogleModalVisibility should toggle visibility', () => {
    let beforeValue = component['dialogVisibe'];

    component.toogleModalVisibility();
    expect(component['dialogVisibe']).toBe(!beforeValue);
  });
});
