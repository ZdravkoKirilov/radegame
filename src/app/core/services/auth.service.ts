import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthPayload, AuthResponse } from '../../profile';
import { AUTH_URLS } from '../config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  registerWithEmail(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<any>(AUTH_URLS.EMAIL_REGISTER, payload);
  }

  loginWithEmail(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_URLS.EMAIL_LOGIN, payload);
  }

}
