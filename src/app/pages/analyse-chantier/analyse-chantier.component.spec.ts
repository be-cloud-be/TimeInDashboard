import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseChantierComponent } from './analyse-chantier.component';

describe('AnalyseChantierComponent', () => {
  let component: AnalyseChantierComponent;
  let fixture: ComponentFixture<AnalyseChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseChantierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
