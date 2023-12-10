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

import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Router, Routes } from '@angular/router';

import { AuthComponent } from '../../../auth/auth.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from 'src/app/modules/core/services/user.service';
import { AiService } from 'src/app/modules/core/services/ai.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { EditProfileFormComponent } from './edit-profile-form.component';

describe('EditProfileFormComponent', () => {
  let component: EditProfileFormComponent;
  let fixture: ComponentFixture<EditProfileFormComponent>;
  let userService: UserService;
  let aiService: AiService;
  let messageService: MessageService;
  let router: Router;

  let routes: Routes = [
    { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        StoreModule,
        SharedModule,
        MenubarModule,
        TagModule,
        InputTextModule,
        FileUploadModule,
        DialogModule,
        EditorModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [MessageService, provideMockStore({}), UserService, AiService],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileFormComponent);
    aiService = TestBed.inject(AiService);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should createForm assing value to form', () => {
    component['createForm']();
    expect(component['formGroup'] instanceof FormGroup).toBe(true);
  });
});
