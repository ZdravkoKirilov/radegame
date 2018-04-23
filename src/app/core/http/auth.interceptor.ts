import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppLocalStorageService } from '../services';
import { AUTH_URLS } from '../config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storage: AppLocalStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.requiresToken(req)) {
            const token = this.storage.get('token');
            const changedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
            return next.handle(changedReq);
        } else {
            return next.handle(req);
        }
    }

    requiresToken(req: HttpRequest<any>) {
        return req.url !== AUTH_URLS.EMAIL_LOGIN && req.url !== AUTH_URLS.EMAIL_REGISTER;
    }
}