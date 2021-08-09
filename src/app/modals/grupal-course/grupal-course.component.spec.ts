import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupalCourseComponent } from './grupal-course.component';

describe('GrupalCourseComponent', () => {
  let component: GrupalCourseComponent;
  let fixture: ComponentFixture<GrupalCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupalCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
