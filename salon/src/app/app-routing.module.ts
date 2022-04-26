import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guard/auth.guard";
import { ContactsComponent } from "./feature/contacts/contacts.component";
import { MyReservationsComponent } from "./feature/my-reservations/my-reservations.component";
import { HomePageComponent } from "./feature/pages/home-page/home-page.component";
import { NotFoundPageComponent } from "./feature/pages/not-found-page/not-found-page.component";
import { ProceduresComponent } from "./feature/procedures/procedures.component";
import { ReservationComponent } from "./feature/reservation/reservation.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'procedures',
        component: ProceduresComponent
    },
    {
        path: 'reservation',
        canActivate: [AuthGuard],
        component: ReservationComponent
    },
    {
        path: 'my-reservations',
        canActivate: [AuthGuard],
        component: MyReservationsComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
    
];

export const AppRoutingModule = RouterModule.forRoot(routes);