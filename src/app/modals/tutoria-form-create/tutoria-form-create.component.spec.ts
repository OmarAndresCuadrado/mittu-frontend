import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaFormCreateComponent } from './tutoria-form-create.component';

describe('TutoriaFormCreateComponent', () => {
  let component: TutoriaFormCreateComponent;
  let fixture: ComponentFixture<TutoriaFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoriaFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoriaFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
