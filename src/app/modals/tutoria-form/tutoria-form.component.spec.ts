import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaFormComponent } from './tutoria-form.component';

describe('TutoriaFormComponent', () => {
  let component: TutoriaFormComponent;
  let fixture: ComponentFixture<TutoriaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoriaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
