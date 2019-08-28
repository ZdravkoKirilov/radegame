import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, selectUser, FetchActiveGames } from '../../state';
import { AutoUnsubscribe } from '@app/shared';
import { map, filter } from 'rxjs/operators';
import { User } from '../../models';

@Component({
  selector: 'rg-active-games-provider',
  template: `
    
  `,
  styles: []
})
@AutoUnsubscribe()
export class ActiveGamesProviderComponent implements OnInit {

  user$: Subscription;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(selectUser),
      filter<User>(Boolean),
      map(user => {
        this.store.dispatch(new FetchActiveGames(user.id));
      })
    ).subscribe();
  }

}
