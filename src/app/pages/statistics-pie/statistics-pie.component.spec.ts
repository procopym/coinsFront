import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPieComponent } from './statistics-pie.component';

describe('StatisticsPipeComponent', () => {
  let component: StatisticsPieComponent;
  let fixture: ComponentFixture<StatisticsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
