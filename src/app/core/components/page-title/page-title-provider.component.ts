import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppState } from '../../state';
import { selectRouteData, AutoUnsubscribe } from '@app/shared';

@Component({
  selector: 'rg-page-title-provider',
  template: ``,
  styles: []
})
@AutoUnsubscribe()
export class PageTitleProviderComponent implements OnInit {

  constructor(private store: Store<AppState>, private titleService: Title) { }

  routeData$: Subscription;

  ngOnInit() {
    this.routeData$ = this.store.pipe(
      /* select(selectRouteData()),
      filter(data => data && !!data.title),
      map(data => {
        this.titleService.setTitle(data.title);
      }) */
    ).subscribe();
  }
}
