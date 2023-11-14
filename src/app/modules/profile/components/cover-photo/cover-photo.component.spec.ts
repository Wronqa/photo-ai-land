import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPhotoComponent } from './cover-photo.component';

describe('CoverPhotoComponent', () => {
  let component: CoverPhotoComponent;
  let fixture: ComponentFixture<CoverPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
