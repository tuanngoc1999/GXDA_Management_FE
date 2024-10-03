import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechistListComponent } from './catechist-list.component';

describe('CatechistListComponent', () => {
  let component: CatechistListComponent;
  let fixture: ComponentFixture<CatechistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatechistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatechistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
