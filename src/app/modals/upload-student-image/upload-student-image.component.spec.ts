import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentImageComponent } from './upload-student-image.component';

describe('UploadStudentImageComponent', () => {
  let component: UploadStudentImageComponent;
  let fixture: ComponentFixture<UploadStudentImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStudentImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
