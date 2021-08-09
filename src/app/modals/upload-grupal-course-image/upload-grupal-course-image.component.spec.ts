import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGrupalCourseImageComponent } from './upload-grupal-course-image.component';

describe('UploadGrupalCourseImageComponent', () => {
  let component: UploadGrupalCourseImageComponent;
  let fixture: ComponentFixture<UploadGrupalCourseImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGrupalCourseImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGrupalCourseImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
