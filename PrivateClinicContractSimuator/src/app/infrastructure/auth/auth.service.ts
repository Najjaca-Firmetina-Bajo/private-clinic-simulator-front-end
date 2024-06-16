import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/enviroment";
import {catchError, mergeMap, Observable, of, tap, throwError} from "rxjs";
import {User} from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }
  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(environment.apiHost + 'auth/login', credentials).pipe(
      tap(response => {
        console.log(response)
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setUserId(response.id);
        }
      }),
      mergeMap(response => {
        return of(response);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.router.navigate(['/']).then(_ => {
        this.removeToken();
        this.removeUserId();
      }
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  public removeToken(): void {
    localStorage.removeItem('token');
  }

  public removeUserId(): void {
    localStorage.removeItem('userId');
  }

}
