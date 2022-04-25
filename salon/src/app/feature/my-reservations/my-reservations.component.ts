import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { compare } from 'src/app/auth/util';
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

  compare: Function;

  isSee:boolean;

  data:string;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }



  ngOnInit(): void {

    this.compare = compare;

    this.authService.currentUser$.subscribe((user) => {
      this.userId = user._id
      this.username = user.username
    })

    this.userService.loadTheamList().subscribe({
      next: (themeList) => {
        this.themeList = themeList
      },
      complete: () => {
        console.log(this.username);

        if (this.userId !== '62657cef275b870db40b1e78') {
          this.themeList = this.themeList.filter(theme => theme.userId._id == this.userId);
        }
      }
    })
  }

  hendleDeleteTheme(themeId: string, userId: string): void {

    this.userService.deleteTheme$(themeId, userId)
      .subscribe({
        next: (theme) => {
          console.log(theme);
        },
        complete: () => {
          this.router.navigate(['/reservation'])
        }
      })

  }
}
