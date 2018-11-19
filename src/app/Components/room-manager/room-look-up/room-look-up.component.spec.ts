import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLookUpComponent } from './room-look-up.component';

describe('RoomLookUpComponent', () => {
  let component: RoomLookUpComponent;
  let fixture: ComponentFixture<RoomLookUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLookUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
