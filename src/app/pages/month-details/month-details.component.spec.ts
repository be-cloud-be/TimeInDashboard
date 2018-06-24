import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDetailsComponent } from './month-details.component';

describe('MonthDetailsComponent', () => {
  let component: MonthDetailsComponent;
  let fixture: ComponentFixture<MonthDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
