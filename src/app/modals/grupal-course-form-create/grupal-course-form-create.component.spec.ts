import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupalCourseFormCreateComponent } from './grupal-course-form-create.component';

describe('GrupalCourseFormCreateComponent', () => {
  let component: GrupalCourseFormCreateComponent;
  let fixture: ComponentFixture<GrupalCourseFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupalCourseFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupalCourseFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
