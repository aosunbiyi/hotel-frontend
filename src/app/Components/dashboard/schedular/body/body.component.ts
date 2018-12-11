import { Component, OnInit, ViewChild } from "@angular/core";
import { LocalDate, LocalTime } from "js-joda";
import { ClrWizard, ClrForm, ClrWizardPage } from "@clr/angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import * as lodash from "lodash";
import * as CN from "countrycitystatejson";

import { BusinessSourceTypesService } from "../../../../services/business-source-types.service";
import { BusinessSourceService } from "../../../../services/business-source.service";
import { RoomsService } from "../../../../services/rooms.service";
import { RoomtypeService } from "../../../../services/roomtype.service";
import { ReservationsService } from "../../../../services/reservations.service";
import { DiscountService } from "../../../../services/discount.service";
import { PaymentMethodService } from "../../../../services/payment-method.service";
import { AccountsService } from "../../../../services/accounts.service";

@Component({
  selector: "app-body",
  templateUrl: "./body.component.html",
  styleUrls: ["./body.component.css"]
})
export class BodyComponent implements OnInit {
  labels: any[] = [];
  room_labels: any[] = [];
  date: any;
  totalDays: any;
  lengthOfMonth: any;
  totalNeededDays: any;
  startingDay: any;
  endingDay: any;
  expectedTotalDay: any;
  jodalLib = LocalDate.now();
  rowIndex = 0;
  DAYS = 30;

  roomlist = [];
  postedReservation;

  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
  @ViewChild("page1") page1: ClrWizardPage;
  @ViewChild("paymentPage") paymentPage: ClrWizardPage;
  @ViewChild("arrivalData") arrivalData;
  @ViewChild("departureDate") departureDate;

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
  countries = [];
  states = [];

  isCheque = false;
  applyDiscount = false;

  /**
   * Constructor
   * @param roomService
   */
  constructor(
    private roomService: RoomsService,
    private formBuilder: FormBuilder,
    private businessSourceTypesService: BusinessSourceTypesService,
    private businessSourceService: BusinessSourceService,
    private roomsService: RoomsService,
    private roomtypeService: RoomtypeService,
    private reservationsService: ReservationsService,
    private discountService: DiscountService,
    private paymentMethodService: PaymentMethodService,
    private accountService: AccountsService
  ) {
    this.jodalLib = LocalDate.now();
    this.date = LocalDate.now();
  }

  /**
   * ngOnInit
   * Get all the rooms
   */
  ngOnInit() {
    const vm = this;
    this.roomService.getRooms().subscribe(function(data) {
      vm.roomlist = data;
      this.room_labels = [];
      vm.generateBody2();
    });

    this.paymentForm = this.formBuilder.group({
      payment_method: ["", Validators.required],
      total_amount: ["", Validators.required],
      amount: ["", Validators.required],
      balance: [""],
      cheque: [""],
      account_number: [""],
      bank_name: [""],
      branch_name: [""],
      discount_plan: [""],
      discount_value: [""],
      discount_code: [""],
      apply_discount: [""]
    });

    this.bookingForm = this.formBuilder.group({
      arrival: ["", Validators.required],
      departure: [""],
      num_of_night: ["", Validators.required],
      account_id: [""],
      book_by: [""],
      book_on: [""],
      payment_method: [""]
    });

    this.userForm = this.formBuilder.group({
      last_name: ["", Validators.required],
      first_name: ["", Validators.required],
      address1: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      postal_code: [""],
      state: ["", Validators.required],
      country: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      fax: [""],
      id: [""]
    });

    this.businessForm = this.formBuilder.group({
      business_source_id: ["", Validators.required],
      room_type_id: ["", Validators.required]
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
      this.reservationList.forEach(dt => {
        dt.fullname = dt.account_.first_name + " " + dt.account_.last_name;
      });
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.countries = CN.getCountries();
  }

  reSetDate(date) {
    this.date = LocalDate.parse(date);
    this.jodalLib = LocalDate.parse(date);
    // empty the room labels
    this.room_labels = [];
    // generate the schedule body.
    this.generateBody2();
  }

  resetRoom(rooms) {
    this.roomlist = rooms;
    // empty the room labels
    this.room_labels = [];
    // generate the schedule body.
    this.generateBody2();
  }

  generateBody2() {
    const vm = this;
    // get the Length of the Month
    this.lengthOfMonth = this.date.lengthOfMonth();
    // Get the total days to be displayed
    this.totalNeededDays = this.DAYS;
    // get the starting day
    this.startingDay = this.date.dayOfMonth();
    // Get the total ending day
    this.endingDay = this.startingDay + this.totalNeededDays;

    // iterate on all the available rooms
    this.roomlist.forEach(room => {
      // initialize the bookings on each room
      vm.room_labels[vm.rowIndex] = new Array();
      vm.totalNeededDays = vm.DAYS;
      const rm = `${room.room_name}-5-room-${room.id}-${room.id}`;
      vm.room_labels[vm.rowIndex].push(rm);

      if (vm.endingDay > vm.lengthOfMonth) {
        const newEndingDay = vm.endingDay - vm.lengthOfMonth;
        for (let i = vm.startingDay; i <= vm.lengthOfMonth; i++) {
          const parseDate = vm.jodalLib.withDayOfMonth(i);
          const year = vm.jodalLib.year();
          const month = vm.jodalLib.monthValue();
          const monthName = vm.jodalLib.month();
          const fulldate = `${year}-${month}-${i}`;
          vm.checkMultipleBookings2(
            parseDate.toString(),
            room.reserved_rooms,
            vm.room_labels,
            vm.rowIndex,
            room.id
          );
          vm.totalNeededDays = vm.totalNeededDays - 1;
        }

        const localJodaLib = vm.jodalLib.plusMonths(1);
        for (let i = 1; i <= vm.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;
          vm.checkMultipleBookings2(
            parseDate.toString(),
            room.reserved_rooms,
            vm.room_labels,
            vm.rowIndex,
            room.id
          );
        }
      } else {
        const localJodaLib = vm.jodalLib.plusMonths(0);
        for (let i = 1; i <= vm.totalNeededDays; i++) {
          const parseDate = localJodaLib.withDayOfMonth(i);
          const year = localJodaLib.year();
          const month = localJodaLib.monthValue();
          const monthName = localJodaLib.month();
          const fulldate = `${year}-${month}-${i}`;
          vm.checkMultipleBookings2(
            parseDate.toString(),
            room.reserved_rooms,
            vm.room_labels,
            vm.rowIndex,
            room.id
          );
        }
      }
      vm.rowIndex += 1;
    });
  }

  checkMultipleBookings2(
    date3,
    reserved_rooms,
    room_labels,
    rowIndex,
    room_id
  ) {
    let seen = false;
    let _date1 = null;
    reserved_rooms.forEach(booking => {
      const t1 = booking.arrival.toString().split("T")[0];
      const t2 = booking.departure.toString().split("T")[0];
      const tempDate = LocalDate.parse(t1).plusDays(booking.num_of_night);
      const d1 = new Date(t1);
      const d2 = new Date(
        d1.getFullYear(),
        d1.getMonth(),
        d1.getDate() + booking.num_of_night
      );
      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const currentDate = LocalDate.parse(t1);
      for (let i = 0; i <= diffDays - 1; i++) {
        const dt = currentDate.plusDays(i);
        const d33 = LocalDate.parse(date3).minusMonths(0);

        if (d33.equals(dt)) {
          const temp = `${booking.original_owner}-${
            booking.reserved_status
          }-booking-${booking.reservation_id}-${room_id}`;
          room_labels[rowIndex].push(temp);
          seen = true;
          _date1 = { d1: d33, d2: dt };
          break;
        }
      }
    });

    if (seen) {
      return;
    } else {
      room_labels[rowIndex].push(room_id);
      return;
    }
  }

  onNewWalkinClicked(room_id) {
    this.open_wizard = true;
  }

  onCountryChange(event) {
    this.states = CN.getStatesByShort(event.target.value);
  }

  public doCustomClick(buttonType: string): void {
    if ("custom-finish" === buttonType) {
      this.wizardExtraLarge.next();
    }

    if ("custom-previous" === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ("custom-danger" === buttonType) {
      this.onFinish();
    }
  }

  public doCustomClick2(buttonType: string): void {
    if ("custom-previous" === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ("custom-next" === buttonType) {
      this.wizardExtraLarge.next();
    }
  }

  public doCustomClick3(buttonType: string): void {
    if ("custom-previous" === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ("custom-next" === buttonType) {
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
          total_amount: this.getTotalReservation400(
            this.reservation_transaction_list
          )[0].total,
          amount: 0,
          balance: 0,
          cheque: 0,
          account_number: 0,
          bank_name: "",
          branch_name: "",
          discount_plan: 0,
          discount_value: 0,
          discount_code: "",
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
      bank_name: "",
      branch_name: "",
      discount_plan: 0,
      discount_value: 0,
      discount_code: "",
      apply_discount: false
    });
  }

  onPhoneLeave(value: string) {
    this.accountService.getAccountByPhone(value).subscribe(data => {
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
      this.states = CN.getStatesByShort(data.country);
      this.userForm.setValue(data);
    });
  }

  onEmailLeave(value: string) {
    this.accountService.getAccountByEmail(value).subscribe(data => {
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
      this.states = CN.getStatesByShort(data.country);
      this.userForm.setValue(data);
    });
  }

  onPaymentMethodChange(event) {
    if (event.target.value === "Cheque") {
      this.isCheque = true;
    } else {
      this.isCheque = false;
    }
  }

  onReservationSelected(rs) {
    this.selectedReservation = rs;
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
      bank_name: "",
      branch_name: "",
      discount_plan: 0,
      discount_value: 0,
      discount_code: "",
      apply_discount: this.applyDiscount
    });
  }

  deleteRoom(rm) {
    lodash.remove(this.selectedRooms, { id: rm.id });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bookingForm.controls;
  }

  onItemSelect(item: any) {
    // tslint:disable-next-line:no-shadowed-variable
    const room = this.dropdownList.find(function(element) {
      return element.item_id === item.item_id;
    });

    this.selectedRooms.push(JSON.parse(room.object_text));
  }
  onSelectAll(items: any) {}

  addRoom() {
    const vm = this;
    if (this.selectedRoom !== null) {
      if (!this.isExist(this.selectedRoom)) {
        const rm = this.rooms.find(function(r) {
          // tslint:disable-next-line:radix
          return r.id === parseInt(vm.selectedRoom);
        });
        this.selectedRooms.push(rm);
        this.selectedRoom = null;
      }
    }
  }

  isExist(id) {
    const isExist = this.selectedRooms.find(function(rm) {
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

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.bookingForm.value));
  }

  onFinish() {
    const vm = this;
    const data = {
      bookingForm: this.bookingForm.value,
      userForm: this.userForm.value,
      businessForm: this.businessForm.value,
      rms: this.selectedRooms,
      paymentForm: this.paymentForm.value
    };
    //console.log(data);
    this.reservationsService.post_reservations(data).subscribe(r => {    
      setTimeout(() => {
        vm.postedReservation = r; 
      }, 1000);
    });

    this.wizardExtraLarge.next();
  }

  onNew() {
    this.open_wizard = true;
  }

  onNightChange(event) {
    const total_days = event.target.value;
    const myDate = new Date(this.arrivalData.nativeElement.value);
    let day = myDate.getDate().toString();
    if (day.length === 1) {
      day = "0" + day;
    }
    const datet1 = LocalDate.parse(
      `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${day}`
    );
    // tslint:disable-next-line:radix
    const datet2 = datet1.plusDays(parseInt(total_days));
    this.departureDate.nativeElement.value = datet2;
  }

  onBusinessSourceChanged(event) {
    this.businessSourceService
      .getByBusinessSourceTypeId(event.target.value)
      .subscribe(data => {
        this.businessSources = data;
      });
  }

  getTotalReservation400(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy("id")
      .map((objs, key) => ({
        id: key,
        total: lodash.sumBy(objs, "total")
      }))
      .value();

    return output;
  }

  getTotalReservation(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy("reservation_id")
      .map((objs, key) => ({
        reservation_id: key,
        total_reservation: lodash.sumBy(objs, "total_reservation")
      }))
      .value();

    return output;
  }

  getTotalExtraAdult(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy("reservation_id")
      .map((objs, key) => ({
        reservation_id: key,
        total_adult: lodash.sumBy(objs, "total_adult")
      }))
      .value();

    return output;
  }

  getTotalExtraChildren(reservation_transaction: any) {
    const output = lodash(reservation_transaction)
      .groupBy("reservation_id")
      .map((objs, key) => ({
        reservation_id: key,
        total_children: lodash.sumBy(objs, "total_children")
      }))
      .value();

    return output;
  }

  showTransactionDetails(rm) {
    this.reservationsService
      .GetReservationDetailsByReservationId(rm.id)
      .subscribe(data => {
        rm.reservation_transaction = data.result;
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
          data.extra_adult = "0";
          data.extra_children = "0";
          data.discount_plan = "0";
          data.discount_value = "0";
          data.discount_code = "0";

          this.dropdownList.push({
            id: data.id,
            text: data.room_name,
            obj: JSON.stringify(data)
          });
        });
      }
    });
  }

  getDiscountStatus(onDiscount, sl) {
    if (onDiscount === 1) {
      return (
        '<a  class="label label-purple clickable">Yes<span class="badge">' +
        sl.discount_amount +
        "</span></a>"
      );
    } else {
      return '<span class="label label-warning">No</span>';
    }
  }

  getReservationStatus(status) {
    if (status === "Open") {
      return '<span class="label label-success">Open</span>';
    } else {
      return '<span class="label label-info">Close</span>';
    }
  }

  public doCustomClick340(buttonType: string): void {
    if ("custom-previous" === buttonType) {
      this.wizardExtraLarge.previous();
    }

    if ("custom-danger" === buttonType) {
      this.onCheckInClicked2();
    }
  }

  onCheckInClicked2() {
    const vm = this;
    if (confirm("Are you sure you want to check in?") === true) {
      const dt = {
        id: vm.postedReservation.id
      };
      this.reservationsService
        .checkin_reservation(dt)
        .subscribe(function(result) {
          alert(result.data);
          window.location.reload();
        });
    }
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
