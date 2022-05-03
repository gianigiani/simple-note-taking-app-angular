import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    // login
    from(this.authService.login(this.authForm.value)).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this._snackBar.open('User logged in successfully', '', {
          duration: 3000,
        });
      },
      error: (err) => {
        if (err.message === ('EMAIL_NOT_FOUND' || 'INVALID_PASSWORD')) {
          this.authForm.setErrors({ credentials: true });
        }
      },
      complete: () => console.log('Login COMPLETED'),
    });
  }
}
