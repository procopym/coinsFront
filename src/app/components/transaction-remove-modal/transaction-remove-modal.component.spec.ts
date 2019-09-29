import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRemoveModalComponent } from './transaction-remove-modal.component';

describe('RemoveModalComponent', () => {
  let component: TransactionRemoveModalComponent;
  let fixture: ComponentFixture<TransactionRemoveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRemoveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRemoveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
