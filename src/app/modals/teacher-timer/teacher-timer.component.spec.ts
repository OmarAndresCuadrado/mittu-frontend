import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTimerComponent } from './teacher-timer.component';

describe('TeacherTimerComponent', () => {
  let component: TeacherTimerComponent;
  let fixture: ComponentFixture<TeacherTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
