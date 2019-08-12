import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthPayload, AuthResponse } from '@app/profile';
import { AUTH_URLS } from '../../config';
import { User } from '@app/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  registerWithEmail(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<any>(AUTH_URLS.EMAIL_REGISTER, payload);
  }

  loginWithEmail(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_URLS.EMAIL_LOGIN, payload);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(AUTH_URLS.CURRENT_USER);
  }

}
