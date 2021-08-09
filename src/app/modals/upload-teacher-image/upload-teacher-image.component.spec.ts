import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTeacherImageComponent } from './upload-teacher-image.component';

describe('UploadTeacherImageComponent', () => {
  let component: UploadTeacherImageComponent;
  let fixture: ComponentFixture<UploadTeacherImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTeacherImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTeacherImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
