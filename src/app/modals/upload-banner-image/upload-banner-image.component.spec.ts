import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBannerImageComponent } from './upload-banner-image.component';

describe('UploadBannerImageComponent', () => {
  let component: UploadBannerImageComponent;
  let fixture: ComponentFixture<UploadBannerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBannerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBannerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
