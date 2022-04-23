import { Component, Input, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { ITheme } from 'src/app/core/interfaces/theme';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  themeList: ITheme[];

  userId: string;

  username: string;

  constructor(private userService: UserService, private authService: AuthService) { }



  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.userId = user._id
      this.username= user.username
    })

    this.userService.loadTheamList().subscribe({
      next: (themeList) => {
        this.themeList = themeList
      },
      complete: () => {
        this.themeList = this.themeList.filter(theme => theme.userId._id == this.userId);
      }
    })
  }

}