import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces/user';
import { tap } from 'rxjs/operators';
import { ITheme } from './interfaces/theme';

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

  reservationHour$(body: { themeName: string/*, postText: string */}): Observable<ITheme> {
    return this.httpClient.post<ITheme>(`${environment.apiUrl}/themes`, body, { withCredentials: true });
  }

  loadTheamList(): Observable<ITheme[]>{
    return this.httpClient.get<ITheme[]>(`${environment.apiUrl}/themes`)
  }

  deleteTheme$(themeId: string, userId: string){
    return this.httpClient.delete<string>(`${environment.apiUrl}/themes/${themeId}/userId/${userId}`,{withCredentials: true})
  }

}

/*
loadThemeList(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${apiUrl}/themes`);
  }
constructor(private http: HttpClient) { }

loadPostList(themeId: string, limit?: number): Observable<IPost[]> {
  return this.http.get<IPost[]>(
    `${apiUrl}/posts${limit ? `?limit=${limit}` : ''}`
  );
}
 switchMap(searchTerm => this.themeService.loadThemeList(searchTerm))
    )
      .subscribe(themeList => {
        this.themeList = themeList;
      });
  }*/