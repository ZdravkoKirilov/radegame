import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { Game, GameTemplate, ImageAsset, GameId } from '@app/game-mechanics';
import {
  selectGame, FetchGameConfig, selectGameConfig, FetchGame, isDownloadingGameMenuData, CreateGameState,
  selectGameState
} from '../../state';

@Component({
  selector: 'rg-game-menu-loader',
  templateUrl: './game-menu-loader.component.html',
  styleUrls: ['./game-menu-loader.component.scss'],
})
@AutoUnsubscribe()
export class GameMenuLoaderComponent implements OnInit {

  game$: Subscription;
  game_config$: Subscription;
  gameId$: Subscription;
  isDownloading$: Subscription;
  loaded$: Subscription;

  game_config: GameTemplate;
  game: Game;
  loaded = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.gameId$ = this.store.pipe(
      select(selectGameId),
      filter<GameId>(Boolean),
      map(gameId => {
        this.store.dispatch(new FetchGame({ gameId }));
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
      map(isDownloading => {
        if (!isDownloading && this.game.menu) {
          this.store.dispatch(new CreateGameState({
            module: this.game.menu,
          }));
        }
      }),
    ).subscribe();

    this.loaded$ = this.store.pipe(
      select(selectGameState),
      map(state => {
        return this.loaded = !!state;
      })
    ).subscribe();
  }

  get imageAssets() {
    if (this.game_config) {
      const asArray = Object.values(this.game_config.images).map((elem: ImageAsset) => elem.image);
      return new Set(asArray);
    }
    return new Set();
  }

  get menuModule() {
    if (this.game_config && this.game) {
      return this.game_config.modules[this.game.menu];
    }
    return null;
  }
}
