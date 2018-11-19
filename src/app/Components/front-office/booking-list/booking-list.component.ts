import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrForm, ClrWizardPage } from '@clr/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDate, LocalTime } from 'js-joda';
import * as lodash from 'lodash';
import { BusinessSourceTypesService } from '../../../services/business-source-types.service';
import { BusinessSourceService } from '../../../services/business-source.service';
import { RoomsService } from '../../../services/rooms.service';
import { RoomtypeService } from '../../../services/roomtype.service';
import { ReservationsService } from '../../../services/reservations.service';
import { DiscountService } from '../../../services/discount.service';
import { PaymentMethodService } from '../../../services/payment-method.service';
import { AccountsService } from '../../../services/accounts.service';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;
  @ViewChild('page1') page1: ClrWizardPage;
  @ViewChild('arrivalData') arrivalData;
  @ViewChild('departureDate') departureDate;
  @ViewChild('departure_time') departure_time;
  @ViewChild('arrival_time') arrival_time;

  open_wizard = false;
  model: any;
  bookingForm: FormGroup;
  userForm: FormGroup;
  businessForm: FormGroup;
  paymentForm: FormGroup;
  submitted = false;

  businessSourceTypes: any = [];
  businessSources: any = [];
  roomTypes: any = [];
  rooms: any = [];
  roomRate: any;
  selectedRoom: any;
  selectedReservation: any;


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedRooms = [];
  discountList = [];
  paymentMethods = [];
  reservationList = [];
  reservation_transactions = [];
  reservation_transaction_list = [];

  isCheque = false;
  applyDiscount = false;



  constructor(
    private formBuilder: FormBuilder,
    private businessSourceTypesService: BusinessSourceTypesService,
    private businessSourceService: BusinessSourceService,
    private roomsService: RoomsService,
    private roomtypeService: RoomtypeService,
    private reservationsService: ReservationsService,
    private discountService: DiscountService,
    private paymentMethodService: PaymentMethodService,
    private accountService: AccountsService) { }

  ngOnInit() {

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

    this.bookingForm = this.formBuilder.group({
      arrival: ['', Validators.required],
      arrival_time: ['', Validators.required],
      departure: [''],
      departure_time: [''],
      num_of_night: ['', Validators.required],
      account_id: [''],
      book_by: [''],
      book_on: [''],
      payment_method: ['']
    });

    this.userForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      postal_code: [''],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fax: [''],
      id: ['']
    });

    this.businessForm = this.formBuilder.group({
      business_source_id: ['', Validators.required],
      room_type_id: ['', Validators.required]
    });



    this.businessSourceTypesService.getBusinessSourceTypes().subscribe(data => {
      this.businessSourceTypes = data;
    });

    this.roomtypeService.getRoomTypes().subscribe(data => {
      this.roomTypes = data;

    });

    this.discountService.getDiscounts().subscribe(data => {
      this.discountList = data;
    });

    this.paymentMethodService.getPaymentMethods().subscribe(data => {
      this.paymentMethods = data;
    });

    this.reservationsService.getReservations().subscribe(data => {
      this.reservationList = data;
      console.log(data);
    });


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
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


  public doCustomClick2(buttonType: string): void {
    if ('custom-previous' === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ('custom-next' === buttonType) {
      this.wizardExtraLarge.next();
    }

  }

  public doCustomClick3(buttonType: string): void {
    if ('custom-previous' === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ('custom-next' === buttonType) {

      const data = {
        bookingForm: this.bookingForm.value,
        userForm: this.userForm.value,
        businessForm: this.businessForm.value,
        rms: this.selectedRooms
      };

      this.reservationsService.get_total_reservation_rate(data).subscribe(r => {
        this.reservation_transaction_list = r.reservation_transaction;
        this.paymentForm.setValue({
          payment_method: 0,
          total_amount: this.getTotalReservation400(this.reservation_transaction_list)[0].total,
          amount: 0,
          balance: 0,
          cheque: 0,
          account_number: 0,
          bank_name: '',
          branch_name: '',
          discount_plan: 0,
          discount_value: 0,
          discount_code: '',
          apply_discount: false
        });
        this.wizardExtraLarge.next();
      });
    }

  }

  onAmountLeave(value: string) {
    const amount = parseFloat(value);
    const total = this.paymentForm.value.total_amount;
    const balance = total - amount;

    this.paymentForm.setValue({
      payment_method: 0,
      total_amount: this.paymentForm.value.total_amount,
      amount: amount,
      balance: balance,
      cheque: 0,
      account_number: 0,
      bank_name: '',
      branch_name: '',
      discount_plan: 0,
      discount_value: 0,
      discount_code: '',
      apply_discount: false
    });

  }

  onPhoneLeave(value: string) {

    this.accountService.getAccountByPhone(value).subscribe(data => {
      console.log(data);
      delete data.account_number;
      delete data.account_type_;
      delete data.account_type_id;
      delete data.alias;
      delete data.card_holder;
      delete data.card_number;
      delete data.created;
      delete data.created_by;
      delete data.created_on;
      delete data.credit_card_type;
      delete data.credit_limit;
      delete data.exp_date;
      delete data.hotel_representative_;
      delete data.hotel_representative_id;
      delete data.modified;
      delete data.opening_balance;
      delete data.payment_term;
      delete data.reg_number;
      delete data.reg_number1;
      delete data.reg_number2;
      delete data.remark;
      delete data.reservations;
      this.userForm.setValue(data);
    });
  }

  onEmailLeave(value: string) {

    this.accountService.getAccountByEmail(value).subscribe(data => {
      console.log(data);
      delete data.account_number;
      delete data.account_type_;
      delete data.account_type_id;
      delete data.alias;
      delete data.card_holder;
      delete data.card_number;
      delete data.created;
      delete data.created_by;
      delete data.created_on;
      delete data.credit_card_type;
      delete data.credit_limit;
      delete data.exp_date;
      delete data.hotel_representative_;
      delete data.hotel_representative_id;
      delete data.modified;
      delete data.opening_balance;
      delete data.payment_term;
      delete data.reg_number;
      delete data.reg_number1;
      delete data.reg_number2;
      delete data.remark;
      delete data.reservations;
      this.userForm.setValue(data);
    });
  }



  onPaymentMethodChange(event) {
    if (event.target.value === 'Cheque') {
      this.isCheque = true;
    } else {
      this.isCheque = false;
    }
  }

  onReservationSelected(event) {
    console.log(this.selectedReservation);
  }

  onDiscountChange(event) {
    this.applyDiscount = event.target.checked;
    this.paymentForm.setValue({
      payment_method: this.paymentForm.value.payment_method,
      total_amount: this.paymentForm.value.total_amount,
      amount: this.paymentForm.value.amount,
      balance: this.paymentForm.value.balance,
      cheque: 0,
      account_number: 0,
      bank_name: '',
      branch_name: '',
      discount_plan: 0,
      discount_value: 0,
      discount_code: '',
      apply_discount: this.applyDiscount
    });

  }

  deleteRoom(rm) {
    lodash.remove(this.selectedRooms, { id: rm.id });

  }

  // convenience getter for easy access to form fields
  get f() { return this.bookingForm.controls; }

  onItemSelect(item: any) {

    // tslint:disable-next-line:no-shadowed-variable
    const room = this.dropdownList.find(function (element) {
      return element.item_id === item.item_id;
    });

    this.selectedRooms.push(JSON.parse(room.object_text));

  }
  onSelectAll(items: any) {

  }

  addRoom() {
    const vm = this;
    if (this.selectedRoom !== null) {
      if (!this.isExist(this.selectedRoom)) {
        const rm = this.rooms.find(function (r) {
          // tslint:disable-next-line:radix
          return r.id === parseInt(vm.selectedRoom);
        });
        this.selectedRooms.push(rm);
        this.selectedRoom = null;
      }
    }
  }

  isExist(id) {
    const isExist = this.selectedRooms.find(function (rm) {
      return rm.id === parseInt(id, 10);
    });
    return isExist;
  }


  onRoomselected(event) {
    this.selectedRoom = event.target.value;
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.bookingForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.bookingForm.value));
  }



  onFinish() {


    const data = {
      bookingForm: this.bookingForm.value,
      userForm: this.userForm.value,
      businessForm: this.businessForm.value,
      rms: this.selectedRooms,
      paymentForm: this.paymentForm.value
    };

    //console.log(data);

    this.reservationsService.post_reservations(data).subscribe(r => {
      console.log(r);
      this.reservationsService.getReservations().subscribe(data2 => {
        this.reservationList = data2;
        this.wizardExtraLarge.navService.setCurrentPage(this.page1);
        this.open_wizard = false;
      });

    });


  }

  onNew() {
    this.open_wizard = true;
  }

  onNightChange(event) {
    const total_days = event.target.value;
    const myDate = new Date(this.arrivalData.nativeElement.value);
    let day = myDate.getDate().toString();
    if (day.length === 1) {
      day = '0' + day;
    }
    const datet1 = LocalDate.parse(`${myDate.getFullYear()}-${myDate.getMonth() + 1}-${day}`);
    // tslint:disable-next-line:radix
    const datet2 = datet1.plusDays(parseInt(total_days));
    this.departureDate.nativeElement.value = datet2;
    this.departure_time.nativeElement.value = this.arrival_time.nativeElement.value;

  }

  onBusinessSourceChanged(event) {
    this.businessSourceService.getByBusinessSourceTypeId(event.target.value).subscribe(data => {
      this.businessSources = data;
    });
  }

  getTotalReservation400(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy('id')
      .map((objs, key) => ({
        'id': key,
        'total': lodash.sumBy(objs, 'total')
      }))
      .value();

    return output;
  }


  getTotalReservation(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy('reservation_id')
      .map((objs, key) => ({
        'reservation_id': key,
        'total_reservation': lodash.sumBy(objs, 'total_reservation')
      }))
      .value();

    return output;
  }

  getTotalExtraAdult(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy('reservation_id')
      .map((objs, key) => ({
        'reservation_id': key,
        'total_adult': lodash.sumBy(objs, 'total_adult')
      }))
      .value();

    return output;
  }

  getTotalExtraChildren(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy('reservation_id')
      .map((objs, key) => ({
        'reservation_id': key,
        'total_children': lodash.sumBy(objs, 'total_children')
      }))
      .value();

    return output;
  }

  showTransactionDetails(rm) {
    this.reservationsService.GetReservationDetailsByReservationId(rm.id).subscribe(data => {
      rm.reservation_transaction = data.result;
      console.log(rm);
    });
  }

  onRoomTypeselected(event) {
    // tslint:disable-next-line:radix
    const id = parseInt(event.target.value);
    this.roomtypeService.getRoomTypeRates(id).subscribe(data => {
      this.roomRate = data;
    });

    this.roomTypes.forEach(rt => {
      if (rt.id === id) {
        this.rooms = rt.rooms;
        this.rooms.forEach(data => {
          data.room_type_name = rt.room_type_name;
          data.extra_adult = '0';
          data.extra_children = '0';
          data.discount_plan = '0';
          data.discount_value = '0';
          data.discount_code = '0';

          this.dropdownList.push({
            id: data.id, text: data.room_name, obj: JSON.stringify(data)
          });
        });

      }
    });


  }

}


export interface Walkin {
  id: number;
  guestName: string;
  identity: string;
  roomType: string;
  room: string;
  rate: number;
}
