import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentImportDialogComponent } from './student-import-dialog.component';

describe('StudentImportDialogComponent', () => {
  let component: StudentImportDialogComponent;
  let fixture: ComponentFixture<StudentImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentImportDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
