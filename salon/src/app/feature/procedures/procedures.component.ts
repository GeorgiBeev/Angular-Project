import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {

  currentUser: IUser;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        console.log(user);
        
        this.currentUser = user;
        console.log(this.currentUser);
        
      },
    })
  }

}