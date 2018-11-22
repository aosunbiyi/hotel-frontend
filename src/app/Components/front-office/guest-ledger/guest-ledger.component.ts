import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrForm, ClrWizardPage } from '@clr/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LocalDate, LocalTime } from 'js-joda';
import * as lodash from 'lodash';
import * as CN from 'countrycitystatejson';

import { AccountsService } from '../../../services/accounts.service';
import { AccountTypeService } from '../../../services/account-type.service';
import { HotelRepresentativeService } from '../../../services/hotel-representative.service';

@Component({
  selector: 'app-guest-ledger',
  templateUrl: './guest-ledger.component.html',
  styleUrls: ['./guest-ledger.component.css']
})
export class GuestLedgerComponent implements OnInit {
  addNew = false;
  editOld = false;
  accountForm: FormGroup;
  editAccountForm: FormGroup;
  submitted = false;
  account_types = [];
  hotel_reps = [];
  countries = [];
  states = [];
  valid_email = true;
  valid_phone = true;
  account_list = [];
  isloading = false;
  selected_account;

  constructor(private formBuilder: FormBuilder,
    private accountTypeService: AccountTypeService,
    private hotelRepresentativeService: HotelRepresentativeService,
    private accountsService: AccountsService) {

    this.loadData();
  }

  ngOnInit() {

  }

  loadData() {
    this.isloading = true;
    this.accountForm = this.formBuilder.group({
      id: [''],
      account_type_id: ['', Validators.required],
      hotel_representative_id: [''],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      credit_limit: [''],
      group_name: [''],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      postal_code: [''],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      fax: [''],
      email: ['', Validators.required],
      remark: ['']
    });

    this.editAccountForm = this.formBuilder.group({
      id: [''],
      account_type_id: ['', Validators.required],
      hotel_representative_id: [''],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      credit_limit: [''],
      group_name: [''],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      postal_code: [''],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      fax: [''],
      email: ['', Validators.required],
      remark: ['']
    });

    this.accountTypeService.getAccountTypes().subscribe(data => {
      this.account_types = data;
    });

    this.hotelRepresentativeService.getHotelRepresentatives().subscribe(data => {
      this.hotel_reps = data;
    });

    this.accountsService.getAccounts().subscribe(data => {
      setTimeout(() => {
        this.account_list = data;
        this.isloading = false;
      }, 1500);
    });


    this.countries = CN.getCountries();
  }

  addNewAccount(event) {
    this.addNew = true;
  }

  onEditAccount() {
    this.accountsService.updateAccount(this.selected_account.id, this.editAccountForm.value).subscribe(data => {
      this.editOld = false;
      this.accountsService.getAccounts().subscribe(dd => {
        setTimeout(() => {
          this.account_list = dd;
          this.isloading = false;
        }, 500);
      });
    });
  }

  editAccount(ac) {
    this.selected_account = null;
    const data = Object.assign({}, ac);
    delete data.account_number;
    delete data.account_type_;
    delete data.alias;
    delete data.card_holder;
    delete data.card_number;
    delete data.created;
    delete data.created_by;
    delete data.created_on;
    delete data.credit_card_type;
    delete data.exp_date;
    delete data.hotel_representative_;
    delete data.modified;
    delete data.opening_balance;
    delete data.payment_term;
    delete data.reg_number;
    delete data.reg_number1;
    delete data.reg_number2;
    delete data.reservations;
    delete data.account_type_name;
    this.selected_account = data;
    this.editAccountForm.setValue(data);
    this.editOld = true;
    this.states = CN.getStatesByShort(data.country);
  }

  onCountryChange(event) {
    this.states = CN.getStatesByShort(event.target.value);
  }

  onSubmitPostAccount() {
    if (confirm('Are you sure you want to post the form?') === true) {
      this.accountsService.addAAcount(this.accountForm.value).subscribe(data => {
        this.addNew = false;
      });
    }
  }

  onPhoneLeave(value: string) {

    this.accountsService.getAccountByPhone(value).subscribe(data => {
      console.log(data);
      this.valid_phone = false;
    }, (err) => {
      this.valid_phone = true;
    });
  }

  onEmailLeave(value: string) {

    this.accountsService.getAccountByEmail(value).subscribe(data => {
      console.log(data);
      this.valid_email = false;

    }, (err) => {
      this.valid_email = true;
    });
  }

}
