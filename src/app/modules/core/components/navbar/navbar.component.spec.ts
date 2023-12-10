import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Message, MessageService } from 'primeng/api';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MenubarModule } from 'primeng/menubar';
import { UserService } from '../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { Router, Routes } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userService: UserService;
  let messageService: MessageService;
  let router: Router;

  let routes: Routes = [
    { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        StoreModule,
        MenubarModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [MessageService, provideMockStore({}), UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('hideItems should assing to items specified value', () => {
    component.hideItems();

    expect(component['items']).toEqual([
      {
        label: 'PhotoAi Land',
      },
    ]);
  });
  it('toogleModalVisibility should toggle dialogVisibe variable', () => {
    let beforeState = component['dialogVisibe'];
    component.toogleModalVisibility();

    expect(component['dialogVisibe']).toBe(!beforeState);
  });
  it('toogleModalFollowersVisibility should toggle dialogFollowersVisible variable', () => {
    let beforeState = component['dialogFollowersVisible'];
    component.toogleModalFollowersVisibility();

    expect(component['dialogFollowersVisible']).toBe(!beforeState);
  });
  it('logout should run service method', () => {
    let spy = spyOn(userService, 'logout').and.callThrough();

    component.logout();

    expect(spy).toHaveBeenCalled();
  });
  it('logout should run service messageService method', () => {
    let spy = spyOn(userService, 'logout').and.returnValue(of('test'));
    let messageSpy = spyOn(messageService, 'add').and.callThrough();

    component.logout();

    expect(messageSpy).toHaveBeenCalled();
  });
  it('logout should run navigate method', () => {
    let spy = spyOn(userService, 'logout').and.returnValue(of('test'));
    let messageSpy = spyOn(messageService, 'add').and.callThrough();

    const navigateSpy = spyOn(router, 'navigate');
    component.logout();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth']);
  });
  it('logout should assign myUser to null', () => {
    let spy = spyOn(userService, 'logout').and.returnValue(of('test'));
    let messageSpy = spyOn(messageService, 'add').and.callThrough();

    const navigateSpy = spyOn(router, 'navigate');
    component.logout();

    expect(component['myUser']).toBeNull();
  });
  it('logout should run hideItems function', () => {
    let spy = spyOn(userService, 'logout').and.returnValue(of('test'));
    let messageSpy = spyOn(messageService, 'add').and.callThrough();
    let hideSpy = spyOn(component, 'hideItems').and.callThrough();

    const navigateSpy = spyOn(router, 'navigate');
    component.logout();

    expect(hideSpy).toHaveBeenCalledWith();
  });
});
