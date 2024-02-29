import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response-model';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<User | undefined>(undefined); //  to set up the new values

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  Login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/api/Auth/login`,
      {
        email: request.email,
        password: request.password,
      }
    );
  }

  // ----- setting up the user in local storage

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-role', user.role);
  }

  // ----- get the user from local storage

  getUser(): User | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('user-email');
      const role = localStorage.getItem('user-role');

      if (email && role) {
        const user: User = {
          email: email,
          role: role,
        };

        return user;
      }
    }

    return undefined;
  }

  //------- emit the values when values are changes

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  //---------- Logout -- clear local storage & cookies

  logout(): void {
    this.cookieService.delete('Authorization', '/');
    localStorage.clear();
    this.$user.next(undefined);
  }
}
