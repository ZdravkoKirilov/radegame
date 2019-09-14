import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState, selectUser, FetchActiveGames, getActiveGames } from '../../state';
import { AutoUnsubscribe, selectRouteData } from '@app/shared';
import { User, ActiveGame } from '../../models';
import { CustomRouteData } from 'app/core/router-custom.serializer';

@Component({
  selector: 'rg-active-games-provider',
  template: `
    <ng-container *ngIf="showActiveGames$ | async">
      <div *ngFor="let game of activeGames$ | async">
        <a [routerLink]="['arena', game.public_id]">Join {{game.public_id}}</a>
      </div>
    </ng-container>
  `,
  styles: []
})
@AutoUnsubscribe()
export class ActiveGamesProviderComponent implements OnInit {

  user$: Subscription;
  activeGames$: Observable<ActiveGame[]>;
  showActiveGames$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(selectUser),
      filter<User>(Boolean),
      map(user => {
        this.store.dispatch(new FetchActiveGames(user.id));
      })
    ).subscribe();

    this.activeGames$ = this.store.pipe(select(getActiveGames));
    this.showActiveGames$ = this.store.pipe(
      select(selectRouteData),
      filter<CustomRouteData>(Boolean),
      map(data => {
        return !data.hide_game_warning;
      }),
    );
  }

}
