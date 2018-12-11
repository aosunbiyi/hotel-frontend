import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGuestLaundryComponent } from './post-guest-laundry.component';

describe('PostGuestLaundryComponent', () => {
  let component: PostGuestLaundryComponent;
  let fixture: ComponentFixture<PostGuestLaundryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGuestLaundryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGuestLaundryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
