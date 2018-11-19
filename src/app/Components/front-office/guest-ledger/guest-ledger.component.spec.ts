import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLedgerComponent } from './guest-ledger.component';

describe('GuestLedgerComponent', () => {
  let component: GuestLedgerComponent;
  let fixture: ComponentFixture<GuestLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
