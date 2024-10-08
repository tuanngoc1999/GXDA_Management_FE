import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationProcessingComponent } from './registration-processing.component';

describe('RegistrationProcessingComponent', () => {
  let component: RegistrationProcessingComponent;
  let fixture: ComponentFixture<RegistrationProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
