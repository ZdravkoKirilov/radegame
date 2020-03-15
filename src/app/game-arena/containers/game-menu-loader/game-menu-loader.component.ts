import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { Game, GameTemplate } from '@app/game-mechanics';
import { selectGame, FetchGameConfig, selectGameConfig, FetchGame, isDownloadingGameMenuData, CreateGameState } from '../../state';

@Component({
  selector: 'rg-game-menu-loader',
  templateUrl: './game-menu-loader.component.html',
  styleUrls: ['./game-menu-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class GameMenuLoaderComponent implements OnInit {

  game$: Subscription;
  game_config$: Subscription;
  gameId$: Subscription;
  isDownloading$: Observable<boolean>;

  game_config: GameTemplate;
  game: Game;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.gameId$ = this.store.pipe(
      select(selectGameId),
      filter<number>(Boolean),
      map(gameId => {
        this.store.dispatch(new FetchGame(gameId));
      })
    ).subscribe();

    this.game$ = this.store.pipe(
      select(selectGame),
      filter<Game>(Boolean),
      map(game => {
        this.game = game;
        this.store.dispatch(new FetchGameConfig({ gameId: game.id, keywords: game.core_data.split(',') }));
      })
    ).subscribe();

    this.game_config$ = this.store.pipe(
      select(selectGameConfig),
      map(config => {
        this.game_config = config;
      })
    ).subscribe();

    this.isDownloading$ = this.store.pipe(
      select(isDownloadingGameMenuData),
      tap(isDownloading => {
        if (!isDownloading && this.game_config && this.game && this.game.menu) {
          this.store.dispatch(new CreateGameState({
            conf: this.game_config,
            round: this.game.menu as number,
          }));
        }
      }),
    );
  }
}
