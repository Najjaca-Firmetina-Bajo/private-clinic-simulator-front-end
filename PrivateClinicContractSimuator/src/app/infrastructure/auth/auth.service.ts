import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/enviroment";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }


  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public setUserInLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  public removeUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }
  login(credentials: { username: string; password: string }) {
    return this.http
      .post<any>(environment.wwwRoot + 'auth/login', credentials)
      .pipe(
        tap((response) => {
          if (response.accessToken) {
            this.setToken(response.accessToken);
            this.getAuthenticatedUserDetails().subscribe(
              (user) => {
                this.setUserInLocalStorage(user);
              },
              (error) => {
                console.error('Error getting authenticated user details:', error);
              }
            );
          }
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(error);
        })
      );
  }

  getAuthenticatedUserDetails(): Observable<User> {
    return this.http.get<User>(environment.wwwRoot + 'auth/who-am-i-detailed');
  }
}
