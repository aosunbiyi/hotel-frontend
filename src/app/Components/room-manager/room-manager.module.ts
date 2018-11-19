import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomLookUpComponent } from '../../Components/room-manager/room-look-up/room-look-up.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoomLookUpComponent],
  exports: [RoomLookUpComponent]
})
export class RoomManagerModule { }
