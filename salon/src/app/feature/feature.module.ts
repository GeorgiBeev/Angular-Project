import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';




@NgModule({
  declarations: [
    ProceduresComponent,
    ReservationComponent,
    MyReservationsComponent,],
  imports: [
    CommonModule
  ],
  exports: [],
})
export class FeatureModule { }
