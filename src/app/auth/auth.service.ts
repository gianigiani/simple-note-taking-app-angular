import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Router } from '@angular/router';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';

import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';

interface RegisterCredentials {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  isLoggedIn = false;

  constructor(
    private router: Router,
    private notesService: NotesService,
    private auth: Auth
  ) {
    if (auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth)
        .pipe(
          traceUntilFirst('auth'),
          map((u) => !!u)
        )
        .subscribe((isLoggedIn) => {
          this.isLoggedIn = true;
        });
    }
  }

  async login(credentials: LoginCredentials) {
    return await signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  async logout() {
    return await signOut(this.auth);
  }

  async register(credentials: RegisterCredentials) {
    return await createUserWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }
}
