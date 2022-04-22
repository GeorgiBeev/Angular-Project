import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CreateUserDto, UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }


  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null,[passwordMatch(this.passwordControl)]),
    }),
    'tel': new FormControl(null, [Validators.required, Validators.minLength(10)]),
  })


  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleRegister(): void{
    const { username, email, passwords, tel} = this.registerFormGroup.value;
    this.errorMessage = '';
    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
      tel: tel
    }

    this.authService.register$(body).subscribe({
      next: user => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    })
    

  }

}
