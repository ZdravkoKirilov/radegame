import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GameArenaService, GameFetchService } from '@app/core';
import {
  actionTypes, FetchGameInstance, FetchGameInstanceSuccess,
  FetchGameInstanceFail, FetchGameConfig, FetchGameConfigFail, FetchGameConfigSuccess, FetchGame, FetchGameSuccess, FetchGameFail, CreateGameState, SetGameState
} from '../actions';
import { formatGameConfigData } from '@app/shared';
import { createGameState } from '@app/game-mechanics';

@Injectable({
  providedIn: 'root'
})
export class ArenaEffectsService {

  constructor(
    private actions$: Actions,
    private arenaApi: GameArenaService,
    private fetchApi: GameFetchService
  ) { }

  @Effect()
  initializeGameState = this.actions$.pipe(
    ofType<CreateGameState>(actionTypes.INITIALIZE_GAME_STATE),
    map(action => {
      const { instance, conf } = action.payload;
      const state = instance.state || createGameState({
        setup: instance.setup, conf, players: instance.players,
      });
      return new SetGameState(state);
    }),
  );

  @Effect()
  getGame = this.actions$.pipe(
    ofType<FetchGame>(actionTypes.FETCH_GAME),
    mergeMap(action => {
      return this.fetchApi.getGame(action.payload).pipe(
        map(game => {
          return new FetchGameSuccess(game);
        }),
        catchError(() => {
          return of(new FetchGameFail());
        })
      );
    })
  )

  @Effect()
  getGameInstance = this.actions$.pipe(
    ofType<FetchGameInstance>(actionTypes.FETCH_GAME_INSTANCE),
    mergeMap(action => {
      return this.arenaApi.fetchActiveGame(action.payload).pipe(
        map(game => {
          return new FetchGameInstanceSuccess(game);
        }),
        catchError(() => {
          return of(new FetchGameInstanceFail());
        })
      )
    })
  )

  @Effect()
  getGameConfig = this.actions$.pipe(
    ofType<FetchGameConfig>(actionTypes.FETCH_GAME_CONFIG),
    mergeMap(action => {
      const query = action.payload.keywords.length ? `keywords=${action.payload.keywords.join(',')}` : '';
      return this.fetchApi.getGameData(action.payload.gameId, query).pipe(
        map(data => {
          data = formatGameConfigData(data);
          return new FetchGameConfigSuccess({
            config: data,
            keywords: action.payload.keywords,
          });
        }),
        catchError(() => {
          return of(new FetchGameConfigFail());
        })
      )
    })
  )
}
