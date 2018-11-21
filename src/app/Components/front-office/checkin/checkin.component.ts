import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ClrWizard, ClrForm, ClrWizardPage } from '@clr/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDate, LocalTime } from 'js-joda';
import * as lodash from 'lodash';
import { ReservationsService } from '../../../services/reservations.service';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckinComponent implements OnInit {
  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;
  @ViewChild('page1') page1: ClrWizardPage;
  criteriaList = [];
  inputType = 'text';
  optionList: SearchParameter[] = [];
  reservations = [];
  open_wizard = false;
  selectedReservation = { accounts_: null, account_id: 0, reserved_rooms: [] };
  loadingAccount = false;


  constructor(private elementRef: ElementRef,
    private reservationsService: ReservationsService,
    private accountService: AccountsService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef) { }

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
    this.refresh();
  }

  onCheckInClicked(reservation) {
    const vm = this;
    this.selectedReservation = reservation;
    vm.selectedReservation.accounts_ = null;
    this.loadingAccount = true;
    this.open_wizard = true;
    console.log(reservation);
    setTimeout(() => {
      this.accountService.getAccountById(this.selectedReservation.account_id).subscribe(data => {
        vm.selectedReservation.accounts_ = data;
        vm.loadingAccount = false;
        this.refresh();
      });
    }, 1000);


  }

  onNumberOfChildChange(event, room) {
    const reservation_id = room.reservation_id;
    const reserved_room_id = room.id;
    const change_value = event.target.value;
    const type = 'child';

    const editData = {
      reservation_id: reservation_id,
      reserved_room_id: reserved_room_id,
      change_value: change_value,
      type: type
    };

    this.reservationsService.edit_reserved_room(editData).subscribe(data => {
      this.selectedReservation = data;
    });
  }

  onNumberOfAdultChange(event, room) {
    const reservation_id = room.reservation_id;
    const reserved_room_id = room.id;
    const change_value = event.target.value;
    const type = 'adult';

    const editData = {
      reservation_id: reservation_id,
      reserved_room_id: reserved_room_id,
      change_value: change_value,
      type: type
    };

    this.reservationsService.edit_reserved_room(editData).subscribe(data => {
      this.selectedReservation = data;
      console.log(data);
    });
  }

  onEditReserved_Room(room) {
    console.log(room);
    // tslint:disable-next-line:no-unused-expression
    this.elementRef.nativeElement.querySelector('.r' + room.id).readOnly = false;
    this.elementRef.nativeElement.querySelector('.rr' + room.id).readOnly = false;
  }

  onFinish() {
    this.wizardExtraLarge.navService.setCurrentPage(this.page1);
    this.open_wizard = false;
  }

  getTotalReservation400(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy('reservation_id')
      .map((objs, key) => ({
        'reservation_id': key,
        'total': lodash.sumBy(objs, 'total')
      }))
      .value();

    return output;
  }

  refresh() {
    this.cd.detectChanges();
  }

}

class SearchParameter {
  public Field: String;
  public Condition: String;
  public Value: String;
}


