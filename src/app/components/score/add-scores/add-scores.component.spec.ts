import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoresComponent } from './add-scores.component';

describe('AddScoresComponent', () => {
  let component: AddScoresComponent;
  let fixture: ComponentFixture<AddScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
