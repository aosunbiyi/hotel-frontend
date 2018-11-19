import { Component, OnInit, ElementRef } from '@angular/core';
import { ReservationsService } from '../../../services/reservations.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  criteriaList = [];
  inputType = 'text';
  optionList: SearchParameter[] = [];
  reservations = [];


  constructor(private elementRef: ElementRef, private reservationsService: ReservationsService) { }

  ngOnInit() {
  }

  addCriterion(event) {
    this.criteriaList.push(1);
  }

  removeLast(event) {
    this.criteriaList.pop();
  }

  onSearchFieldChange(event) {
    const v = event.target.value;
    if (v === 'select') {
      this.inputType = 'text';
      return;
    }
    const t1 = v.toString().split('|')[0];
    const t2 = v.toString().split('|')[1];
    this.elementRef.nativeElement.querySelector('.vv0').type = t2;
  }

  onReservationSearch(event) {
    this.optionList = [];
    const field1: string = this.elementRef.nativeElement.querySelector('.ss0').value;
    const field2: string = this.elementRef.nativeElement.querySelector('.cc0').value;
    const field3: string = this.elementRef.nativeElement.querySelector('.vv0').value;

    if (field1 === '' || field1.toString().length <= 0 || field1 === 'select') {
      alert('Search Field cannot be empty!');
      return;
    }

    if (field2 === '' || field2.toString().length <= 0) {
      alert('Search Condition cannot be empty!');
      return;
    }

    if (field3 === '' || field3.toString().length <= 0) {
      alert('Search Value cannot be empty!');
      return;
    }
    const param: SearchParameter = new SearchParameter();
    param.Field = field1;
    param.Condition = field2;
    param.Value = field3;
    this.optionList.push(param);

    let i = 0;
    for (i = 0; i < this.criteriaList.length; i++) {
      const field: string = this.elementRef.nativeElement.querySelector('.s' + i.toString()).value;
      const condition: string = this.elementRef.nativeElement.querySelector('.c' + i.toString()).value;
      const value: string = this.elementRef.nativeElement.querySelector('.v' + i.toString()).value;

      if (field === '' || field1.toString().length <= 0 || field1 === 'select') {
        continue;
      }

      if (condition === '' || field2.toString().length <= 0) {
        continue;
      }

      if (value === '' || field3.toString().length <= 0) {
        continue;
      }

      const param2: SearchParameter = new SearchParameter();
      param2.Field = field;
      param2.Condition = condition;
      param2.Value = value;
      this.optionList.push(param2);


    }
    this.reservationsService.searchReservationWithParam(this.optionList).subscribe(data => {
      this.reservations = data;
    });

  }


  onSearchFieldChange2(event) {
    const v = event.target.value;
    if (v === 'select') {
      this.inputType = 'text';
      return;
    }
    const t1 = v.toString().split('|')[0];
    const t2 = v.toString().split('|')[1];
    const count = v.toString().split('|')[2];
    this.elementRef.nativeElement.querySelector('.v' + count.toString()).type = t2;
  }

}

class SearchParameter {
  public Field: String;
  public Condition: String;
  public Value: String;
}


