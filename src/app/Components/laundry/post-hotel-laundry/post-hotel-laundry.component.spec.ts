import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHotelLaundryComponent } from './post-hotel-laundry.component';

describe('PostHotelLaundryComponent', () => {
  let component: PostHotelLaundryComponent;
  let fixture: ComponentFixture<PostHotelLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHotelLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHotelLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
