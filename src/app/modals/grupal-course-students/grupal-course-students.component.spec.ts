import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupalCourseStudentsComponent } from './grupal-course-students.component';

describe('GrupalCourseStudentsComponent', () => {
  let component: GrupalCourseStudentsComponent;
  let fixture: ComponentFixture<GrupalCourseStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupalCourseStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupalCourseStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
