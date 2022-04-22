import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  currentUser: IUser;

  isInEditMode: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }


  enterEditMode(): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: this.currentUser.email,
        username: this.currentUser.username,
        tel: this.currentUser.tel
      })
    });
  }

  
  updateProfile(editProfileForm: NgForm): void {
    const user = {
      username: this.currentUser.username,
      email: editProfileForm.value.email,
      tel: editProfileForm.value.tel,
    }
  console.log(user);
   this.userService.updateProfile$(user).subscribe({
    next: (user) => {
      console.log(user);
    this.isInEditMode = false;
      this.router.navigate(['/home']);
    },
    error: (error) => {
      console.error(error);
    }
   })
  }

}
