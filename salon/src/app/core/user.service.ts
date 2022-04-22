import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user';
//import { StorageService } from './storage.service';
import { tap } from 'rxjs/operators';

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email' | 'tel'> {
}

export interface CreateUserDto { username: string, email: string, password: string, tel: string };

@Injectable()
export class UserService {

  currentUser: IUser;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor( private httpClient: HttpClient) {}

  
  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
      .pipe(tap(user => this.currentUser = user))
  }

  updateProfile$(newUser: IUpdateUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, newUser, { withCredentials: true })
  }

}
