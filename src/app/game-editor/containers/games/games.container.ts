import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState, selectUserId } from '@app/core';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { AutoUnsubscribe } from '@app/shared';
import { Game } from '@app/game-mechanics';

import { composeGameForm } from '../../forms';
import { FetchGamesAction, selectAllGames, getEntities } from '../../state';

@Component({
  selector: 'rg-games-container',
  templateUrl: './games.container.html',
  styleUrls: ['./games.container.scss']
})
@AutoUnsubscribe()
export class GamesContainerComponent implements OnInit {
  private userId$: Subscription;

  games$: Observable<Game[]>;
  connectedEntities$: Observable<ConnectedEntities>;
  formDefinition: FormDefinition = composeGameForm;

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.userId$ = this.store.pipe(
      select(selectUserId),
      map(userId => this.store.dispatch(new FetchGamesAction({ userId }))),
    ).subscribe();

    this.games$ = this.store.pipe(select(selectAllGames));
    this.connectedEntities$ = this.store.pipe(select(getEntities));
  }

  deleteGame(game: Game) {
    
  }
}
