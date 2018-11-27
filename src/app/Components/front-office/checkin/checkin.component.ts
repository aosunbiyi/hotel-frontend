import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Renderer } from '@angular/core';
import { ClrWizard, ClrForm, ClrWizardPage } from '@clr/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDate, LocalTime } from 'js-joda';
import * as lodash from 'lodash';
import { ReservationsService } from '../../../services/reservations.service';
import { AccountsService } from '../../../services/accounts.service';
import { DiscountService } from '../../../services/discount.service';

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
  selectedReservation = { accounts_: null, account_id: 0, reserved_rooms: [], id: 0 };
  loadingAccount = false;
  account_list = [];
  selected_account;
  transfer_mode = false;
  search_data;
  paymentForm: FormGroup;
  isCheque = false;
  applyDiscount = false;
  discountList = [];


  constructor(private elementRef: ElementRef,
    private reservationsService: ReservationsService,
    private accountService: AccountsService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    public renderer: Renderer,
    private discountService: DiscountService) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(data => {
      this.account_list = data;
      this.account_list.forEach(ac => {
        ac.fullname = ac.first_name + ' ' + ac.last_name;
      });
    });

    this.paymentForm = this.formBuilder.group({
      payment_method: ['', Validators.required],
      total_amount: ['', Validators.required],
      amount: ['', Validators.required],
      balance: [''],
      cheque: [''],
      account_number: [''],
      bank_name: [''],
      branch_name: [''],
      discount_plan: [''],
      discount_value: [''],
      discount_code: [''],
      apply_discount: ['']
    });


    this.discountService.getDiscounts().subscribe(data => {
      this.discountList = data;
    });



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
    this.search_data = this.optionList;
    this.reservationsService.searchReservationWithParam(this.optionList).subscribe(data => {
      this.reservations = data;
      console.log(data);
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

    this.paymentForm.setValue({
      payment_method: '',
      total_amount: reservation.balance,
      amount: 0,
      balance: 0,
      cheque: '',
      account_number: '',
      bank_name: '',
      branch_name: '',
      discount_plan: 0,
      discount_value: 0,
      discount_code: '',
      apply_discount: false
    });

    const vm = this;
    this.selectedReservation = reservation;
    vm.selectedReservation.accounts_ = null;
    this.loadingAccount = true;
    this.open_wizard = true;
    console.log(reservation);
    setTimeout(() => {
      this.accountService.getAccountById(this.selectedReservation.account_id).subscribe(data => {
        vm.selectedReservation.accounts_ = data;
        console.log(data);
        vm.loadingAccount = false;
        this.refresh();
      });
    }, 1000);


  }

  onRoomOwnerChanged(event, room) {
    // console.log(event, room, this.selected_account);
    const transferData = {
      reserved_room_id: room.id,
      new_account_id: this.selected_account
    };
    this.reservationsService.transfer_room(transferData).subscribe(data => {
      delete room.transfer_mode;
      this.reservationsService.searchReservationWithParam(this.optionList).subscribe(dd => {
        this.reservations = dd;
      });
    });
  }

  onDeleteReservation(id) {
    this.reservationsService.delete_reserved_room(id).subscribe(data => {
      console.log(data);
      this.reservationsService.searchReservationWithParam(this.optionList).subscribe(dd => {
        this.reservations = dd;
      });
    });
  }

  onTransferMode(room) {
    room.transfer_mode = true;
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
    this.transfer_mode = false;

    const data = {
      reservation_id: this.selectedReservation.id,
      paymentForm: this.paymentForm.value
    };

    this.reservationsService.post_reservation_payment(data).subscribe(r => {
      console.log(r);
      this.reservationsService.getReservations().subscribe(data2 => {
        this.wizardExtraLarge.navService.setCurrentPage(this.page1);
        this.open_wizard = false;
      });

    });


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

  public doCustomClick(buttonType: string): void {
    if ('custom-finish' === buttonType) {
      this.wizardExtraLarge.next();
    }

    if ('custom-previous' === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ('custom-danger' === buttonType) {
      this.onFinish();
      console.log(this.paymentForm.value);
    }
  }

  onPaymentMethodChange(event) {
    if (event.target.value === 'Cheque') {
      this.isCheque = true;
    } else {
      this.isCheque = false;
    }
  }


  onDiscountChange(event) {
    this.applyDiscount = event.target.checked;
    this.paymentForm.setValue({
      payment_method: this.paymentForm.value.payment_method,
      total_amount: this.paymentForm.value.total_amount,
      amount: this.paymentForm.value.amount,
      balance: this.paymentForm.value.balance,
      cheque: '',
      account_number: '',
      bank_name: '',
      branch_name: '',
      discount_plan: 0,
      discount_value: 0,
      discount_code: '',
      apply_discount: this.applyDiscount
    });

  }

  onAmountLeave(value: string) {
    const amount = parseFloat(value);
    const total = this.paymentForm.value.total_amount;
    const balance = total - amount;

    this.paymentForm.setValue({
      payment_method: this.paymentForm.value.payment_method,
      total_amount: this.paymentForm.value.total_amount,
      amount: amount,
      balance: balance,
      cheque: '',
      account_number: '',
      bank_name: '',
      branch_name: '',
      discount_plan: 0,
      discount_value: 0,
      discount_code: '',
      apply_discount: this.applyDiscount
    });

  }

  getDiscountStatus(onDiscount, sl) {
    if (onDiscount === 1) {
      return '<a  class="label label-purple clickable">Yes<span class="badge">' + sl.discount_amount + '</span></a>';
    } else {
      return '<span class="label label-warning">No</span>';
    }
  }

  getReservationStatus(status) {

    if (status === 'Open') {
      return '<span class="label label-success">Open</span>';
    } else {
      return '<span class="label label-info">Close</span>';
    }
  }


  checkPaymentVisibility(status) {
    if (status === 'Completed') {
      return true;
    } else {
      return false;
    }
  }


}

class SearchParameter {
  public Field: String;
  public Condition: String;
  public Value: String;
}


