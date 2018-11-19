import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfOrderComponent } from './out-of-order.component';

describe('OutOfOrderComponent', () => {
  let component: OutOfOrderComponent;
  let fixture: ComponentFixture<OutOfOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutOfOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutOfOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
