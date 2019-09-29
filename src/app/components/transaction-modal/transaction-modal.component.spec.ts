import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModalComponent } from './requests-modal.component';

describe('RequestsModalComponent', () => {
  let component: TransactionModalComponent;
  let fixture: ComponentFixture<TransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
