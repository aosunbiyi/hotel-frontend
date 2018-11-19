import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDataBaseComponent } from './guest-data-base.component';

describe('GuestDataBaseComponent', () => {
  let component: GuestDataBaseComponent;
  let fixture: ComponentFixture<GuestDataBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestDataBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestDataBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
