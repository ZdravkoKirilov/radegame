import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AutoUnsubscribe } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
@AutoUnsubscribe()
export class RouterDataService {

  _data$: Subscription;
  readonly data$ = new BehaviorSubject({});

  _params$: Subscription;
  readonly params$ = new BehaviorSubject({});

  _queryParams$: Subscription;
  queryParams$ = new BehaviorSubject({});

  _url$: Subscription;
  url$ = new BehaviorSubject("");

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._data$ = this.route.data.pipe(
      tap(data => { this.data$.next(data); })
    ).subscribe();

    this._params$ = this.route.params.pipe(
      tap(params => this.params$.next(params))
    ).subscribe();

    this._queryParams$ = this.route.queryParams.pipe(
      tap(queryParams => this.queryParams$.next(queryParams))
    ).subscribe();

    this._url$ = this.router.events.pipe(
      tap(event => {
        if (event instanceof NavigationEnd) {
          this.url$.next(event.url);
        }
      })
    ).subscribe();

  }


}
