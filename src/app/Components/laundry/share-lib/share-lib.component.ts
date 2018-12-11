import { Component, OnInit, ElementRef , Renderer2 } from "@angular/core";
import { RoomtypeService } from "../../../services/roomtype.service";
import { RoomsService } from "../../../services/rooms.service";
import { AccountsService } from "../../../services/accounts.service";
import { LaundryService } from "../../../services/laundry-services.service";
import { LaundryHotelService } from "../../../services/laundry-hotel-services.service";
import { LaundryPackagingTypesService } from "../../../services/laundry-packaging-types.service";
import { environment } from '../../../../environments/environment';

@Component({
  selector: "app-share-lib",
  templateUrl: "./share-lib.component.html",
  styleUrls: ["./share-lib.component.css"]
})
export class ShareLibComponent implements OnInit {
  canPostGuestLaundry = true;
  isLoadingComponents = false;
  roomTypes = [];
  rooms = [];
  account_list = [];
  laundry_services=[];
  laundry_hotel_services =[];
  laundry_packaging_types=[];
  selected_account;
  baseUrl;

  constructor(
    private roomtypeService: RoomtypeService,
    private roomsService: RoomsService,
    private accountService: AccountsService,
    private laundryService:LaundryService, 
    private laundryHotelService:LaundryHotelService,
    private laundryPackagingTypesService:LaundryPackagingTypesService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  public onPostGuestLaundry() {
    const vm = this;
    this.rooms=[];
    this.canPostGuestLaundry = true;
    this.isLoadingComponents = true;
    setTimeout(() => {
      vm.isLoadingComponents = false;
    }, 1200);
  }

  ngOnInit() {
    const vm = this;
    this.baseUrl = environment.baseIp;
    this.roomtypeService.getRoomTypes().subscribe(function(result) {
      vm.roomTypes = result;
    });
    this.accountService.getAccounts().subscribe(function(result) {
      vm.account_list = result;
      vm.account_list.forEach(ac => {
        ac.fullname = ac.first_name + ' ' + ac.last_name;
      });
    });

    this.laundryService.getLaundryServices().subscribe(function(result){
       vm.laundry_services= result;
       console.log(result);
    });

    this.laundryHotelService.getLaundryHotelServices().subscribe(function(result){
      vm.laundry_hotel_services = result;
    });

    this.laundryPackagingTypesService.getLaundryPackagingTypes().subscribe(function(result){
      vm.laundry_packaging_types = result;      
      console.log(result);
    });
  }

  onRoomTypeChanged(event) {
    const vm = this;
    const room_type_id = event.target.value;
    this.rooms = null;
    if (room_type_id === "--select--") return;
    this.roomsService
      .getRoomsByRoomTypeId(room_type_id)
      .subscribe(function(result) {
        vm.rooms = result;
        console.log(vm.rooms);
      });
  }

  onServiceSelected(event, index){
    const vm = this;

    for(let i=0;i< this.laundry_services.length;i++){
      const el= this.elementRef.nativeElement.querySelector('.cc'+i);
      this.renderer.removeClass(el, 'service_container_selected');
    }
        
   const element = this.elementRef.nativeElement.querySelector('.cc'+index);
   this.renderer.addClass(element, 'service_container_selected');
  }

  onServiceSelected2(event, index){
    const vm = this;

    for(let i=0;i< this.laundry_hotel_services.length;i++){
      const el= this.elementRef.nativeElement.querySelector('.cx'+i);
      this.renderer.removeClass(el, 'service_container_selected2');
    }
        
   const element = this.elementRef.nativeElement.querySelector('.cx'+index);
   this.renderer.addClass(element, 'service_container_selected2');
  }

  onServiceSelected3(event, index){
    const vm = this;
    for(let i=0;i< this.laundry_packaging_types.length;i++){
      const el= this.elementRef.nativeElement.querySelector('.cs'+i);
      this.renderer.removeClass(el, 'service_container_selected3');
    }        
   const element = this.elementRef.nativeElement.querySelector('.cs'+index);
   this.renderer.addClass(element, 'service_container_selected3');
  }

  //
}
