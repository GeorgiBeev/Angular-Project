import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  
  constructor(private userService: UserService, private router: Router) { }
  isClick: boolean;

  ngOnInit(): void {
  }

  handleReserve(time: string): void {
    this.userService.reservationHour$({
      themeName: time,
    }).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

}
