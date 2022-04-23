import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nextMonth } from 'src/app/auth/util';
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

  constructor(private userService: UserService, private router: Router) { }


  ngOnInit(): void {

    this.disabled=[];
    
    this.userService.loadTheamList().subscribe({
      next: (themeList) => {
        this.themeList = themeList;
      },
      complete: () => {       
        this.themeList.forEach((theme) => this.disabled.push(theme.themeName));
      }      
    })
    
    this.nextMonth = nextMonth();
  }


  handleReserve(time: string): void {
    this.userService.reservationHour$({
      themeName: time,
    }).subscribe(() => {
      this.router.navigate(['/my-reservations'])
    })
  }

}
 /*this.userService.loadTheamList().subscribe({
    next: (themeList) => {
      this.themeList = themeList
    },
    complete: () => {
      this.themeList = this.themeList.filter(theme => theme.userId._id == this.userId);
    }
  })*/