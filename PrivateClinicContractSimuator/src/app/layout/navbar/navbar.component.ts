import { Component } from '@angular/core';
import {AuthService} from "../../infrastructure/auth/auth.service";
import {User} from "../../infrastructure/auth/model/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: User | undefined;

  constructor(private authService: AuthService) { }

}
