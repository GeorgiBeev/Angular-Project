import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { ContactsComponent } from './contacts/contacts.component';




@NgModule({
  declarations: [
    ProceduresComponent,
    ReservationComponent,
    MyReservationsComponent,
    ContactsComponent,],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [],
})
export class FeatureModule { }
