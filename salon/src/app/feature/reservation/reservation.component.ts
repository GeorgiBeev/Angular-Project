import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { compare, hourNow, nextMonth } from 'src/app/auth/util';
import { ITheme } from 'src/app/core/interfaces/theme';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  nextMonth: number[];
  disabled: string[];
  themeList: ITheme[];
  timeNow: string;
  compare: Function;
  isChoosProcedure: boolean;
  procedure: string




  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {

    this.isChoosProcedure = false;

    this.compare = compare;

    this.disabled = [];

    this.userService.loadTheamList().subscribe({
      next: (themeList) => {
        this.themeList = themeList;
      },
      complete: () => {
        this.themeList.forEach((theme) => this.disabled.push(theme.themeName));
        console.log('this.themeList', this.themeList);
      }
    })
    this.timeNow = hourNow();

    this.nextMonth = nextMonth();
  }

  handleReserve(time: string): void {
    this.userService.reservationHour$({
      themeName: time,
      themeProcedure: this.procedure
    }).subscribe(() => {
      this.router.navigate(['/my-reservations'])
    })
  }

  handleChoose(procedure): void {
    this.isChoosProcedure = true
    this.procedure = procedure
    console.log(this.procedure);
    
  }
}