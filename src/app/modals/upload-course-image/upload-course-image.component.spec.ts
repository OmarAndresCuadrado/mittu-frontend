import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCourseImageComponent } from './upload-course-image.component';

describe('UploadCourseImageComponent', () => {
  let component: UploadCourseImageComponent;
  let fixture: ComponentFixture<UploadCourseImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCourseImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCourseImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
