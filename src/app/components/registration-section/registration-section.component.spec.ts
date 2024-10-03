import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSectionComponent } from './registration-section.component';

describe('RegistrationSectionComponent', () => {
  let component: RegistrationSectionComponent;
  let fixture: ComponentFixture<RegistrationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
