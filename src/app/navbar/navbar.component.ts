import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onLogout() {
    from(this.authService.logout()).subscribe({
      next: () => this.router.navigateByUrl('/login'),
      error: (err) => console.log(err),
      complete: () => console.log('logged out COMPLETED'),
    });
  }
}
