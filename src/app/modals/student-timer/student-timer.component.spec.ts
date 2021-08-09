import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTimerComponent } from './student-timer.component';

describe('StudentTimerComponent', () => {
  let component: StudentTimerComponent;
  let fixture: ComponentFixture<StudentTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
