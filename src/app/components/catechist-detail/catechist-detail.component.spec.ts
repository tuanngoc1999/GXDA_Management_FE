import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechistDetailComponent } from './catechist-detail.component';

describe('CatechistDetailComponent', () => {
  let component: CatechistDetailComponent;
  let fixture: ComponentFixture<CatechistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatechistDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatechistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
