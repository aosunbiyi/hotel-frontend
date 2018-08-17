import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelWalkinComponent } from './hotel-walkin.component';

describe('HotelWalkinComponent', () => {
  let component: HotelWalkinComponent;
  let fixture: ComponentFixture<HotelWalkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelWalkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelWalkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
