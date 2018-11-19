import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ClrWizard} from '@clr/angular';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  bookingForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.bookingForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      console.log('Invalid form');
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.bookingForm.value));
  }


}
