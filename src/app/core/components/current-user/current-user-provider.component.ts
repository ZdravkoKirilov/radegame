import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, GetCurrentUserAction } from '../../state';

@Component({
  selector: 'rg-current-user-provider',
  template: ``,
  styles: []
})
export class CurrentUserProviderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetCurrentUserAction());
  }

}
