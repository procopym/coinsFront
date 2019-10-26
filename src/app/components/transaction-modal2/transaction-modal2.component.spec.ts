import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModal2Component } from './transaction-modal2.component';

describe('TransactionModal2Component', () => {
  let component: TransactionModal2Component;
  let fixture: ComponentFixture<TransactionModal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionModal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
