import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
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

  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router,public authService: AuthService) { }

  ngOnInit(): void {
   this.loadProfile();
  }

  loadProfile(){
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log(this.currentUser);
        
      },
      error: () => {
        console.log('profil');
        
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
    this.errorMessage = '';
    const user = {
      username: editProfileForm.value.username,
      email: editProfileForm.value.email,
      tel: editProfileForm.value.tel,
    }
   this.userService.updateProfile$(user).subscribe({
    next: (user) => {
      console.log(user);
    this.isInEditMode = false;
    this.loadProfile();
    this.authService._currentUser.next(user);
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err.error.message;
    }
   })
  }

}
