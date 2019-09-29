import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsModalComponent } from './counts-modal.component';

describe('CountsModalComponent', () => {
  let component: CountsModalComponent;
  let fixture: ComponentFixture<CountsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
