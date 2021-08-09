import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedNvbarComponent } from './logged-nvbar.component';

describe('LoggedNvbarComponent', () => {
  let component: LoggedNvbarComponent;
  let fixture: ComponentFixture<LoggedNvbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedNvbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedNvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
