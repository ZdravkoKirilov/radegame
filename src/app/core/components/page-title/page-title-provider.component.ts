import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { map, filter } from 'rxjs/operators';

import { AppState } from '../../state';

@Component({
  selector: 'rg-page-title-provider',
  template: ``,
  styles: []
})
export class PageTitleProviderComponent implements OnInit {

  constructor(private store: Store<AppState>, private titleService: Title) { }

  ngOnInit() {
    this.store.select('router').pipe(
      filter(data => data && data.state && data.state.data),
      map(routeData => {
        this.titleService.setTitle((routeData as any).title);
      })
    ).subscribe();
  }
}
