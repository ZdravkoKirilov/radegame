import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectGameInstanceId, AutoUnsubscribe } from '@app/shared';

import {
  FetchGameInstance, selectGameInstance, FetchGameConfig,
  isDownloadingGameData, FetchGame
} from '../../state';
import { GameInstance } from '../../models';

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
  active_game$: Subscription;

  isDownloading$: Observable<boolean>;

  ngOnInit() {
    this.game_id$ = this.store.pipe(
      select(selectGameInstanceId),
      map(id => {
        this.store.dispatch(new FetchGameInstance(id));
      })
    ).subscribe();

    this.active_game$ = this.store.pipe(
      select(selectGameInstance),
      filter<GameInstance>(Boolean),
      map(instance => {
        this.store.dispatch(new FetchGame(instance.game_id));
        this.store.dispatch(new FetchGameConfig(instance.game_id));
      })
    ).subscribe();

    this.isDownloading$ = this.store.pipe(select(isDownloadingGameData));
  }
}
