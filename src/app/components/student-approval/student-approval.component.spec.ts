import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovalComponent } from './student-approval.component';

describe('StudentApprovalComponent', () => {
  let component: StudentApprovalComponent;
  let fixture: ComponentFixture<StudentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
