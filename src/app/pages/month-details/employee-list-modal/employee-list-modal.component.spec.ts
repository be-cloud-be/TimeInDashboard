import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListModalComponent } from './employee-list-modal.component';

describe('EmployeeListModalComponent', () => {
  let component: EmployeeListModalComponent;
  let fixture: ComponentFixture<EmployeeListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
