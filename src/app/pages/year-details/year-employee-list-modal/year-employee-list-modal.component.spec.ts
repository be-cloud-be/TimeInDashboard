import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearEmployeeListModalComponent } from './year-employee-list-modal.component';

describe('YearEmployeeListModalComponent', () => {
  let component: YearEmployeeListModalComponent;
  let fixture: ComponentFixture<YearEmployeeListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearEmployeeListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearEmployeeListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
