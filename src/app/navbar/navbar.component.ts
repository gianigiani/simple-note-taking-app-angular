import { Component, Input, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((auth) => {
      this.user = {
        email: auth.email,
        uuid: auth.uid,
      };
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
