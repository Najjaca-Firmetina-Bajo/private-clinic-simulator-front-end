import { Component } from '@angular/core';
import {AuthService} from "../../infrastructure/auth/auth.service";
import {User} from "../../infrastructure/auth/model/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userId: string | null = "";

  constructor(private authService: AuthService) { }

  isUserLoggedIn(): boolean {
    this.userId = this.authService.getUserId();
    return !!this.userId;
  }
  onLogout(): void {
    this.authService.logout();
    this.userId = null;
  }

}
