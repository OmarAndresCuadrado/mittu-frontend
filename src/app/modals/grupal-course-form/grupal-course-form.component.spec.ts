import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupalCourseFormComponent } from './grupal-course-form.component';

describe('GrupalCourseFormComponent', () => {
  let component: GrupalCourseFormComponent;
  let fixture: ComponentFixture<GrupalCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupalCourseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupalCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
