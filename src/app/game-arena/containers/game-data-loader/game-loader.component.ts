import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectGameInstanceId, AutoUnsubscribe } from '@app/shared';

import {
  FetchGameInstance, selectGameInstance, FetchGameConfig,
  isDownloadingGameData, FetchGame, selectGameConfig, CreateGameState
} from '../../state';
import { GameInstance } from '../../models';
import { GameTemplate } from '@app/game-mechanics';

@Component({
  selector: 'rg-game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class GameLoaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  game_id$: Subscription;
  game_instance$: Subscription;
  game_config$: Subscription;

  isDownloading$: Observable<boolean>;

  game_instance: GameInstance;
  game_config: GameTemplate;

  ngOnInit() {
    this.game_id$ = this.store.pipe(
      select(selectGameInstanceId),
      map(id => {
        this.store.dispatch(new FetchGameInstance(id));
      })
    ).subscribe();

    this.game_instance$ = this.store.pipe(
      select(selectGameInstance),
      filter<GameInstance>(Boolean),
      map(instance => {
        this.game_instance = instance;
        this.store.dispatch(new FetchGame(instance.game_id));
        this.store.dispatch(new FetchGameConfig(instance.game_id));
      })
    ).subscribe();

    this.game_config$ = this.store.pipe(
      select(selectGameConfig),
      map(config => {
        this.game_config = config;
      })
    ).subscribe();

    this.isDownloading$ = this.store.pipe(
      select(isDownloadingGameData),
      tap(isDownloading => {
        if (!isDownloading && this.game_config && this.game_instance) {
          this.store.dispatch(new CreateGameState({
            instance: this.game_instance,
            conf: this.game_config,
          }));
        }
      }),
    );
  }
}
