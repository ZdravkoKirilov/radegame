import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GameArenaService, GameFetchService } from '@app/core';
import {
  actionTypes, FetchGameInstance, FetchGameInstanceSuccess,
  FetchGameInstanceFail, FetchGameConfig, FetchGameConfigFail, FetchGameConfigSuccess, FetchGame, FetchGameSuccess, FetchGameFail
} from '../actions';
import { formatGameConfigData } from '@app/shared';

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
      return this.fetchApi.getGameData(action.payload).pipe(
        map(data => {
          data = formatGameConfigData(data);
          return new FetchGameConfigSuccess(data);
        }),
        catchError(() => {
          return of(new FetchGameConfigFail());
        })
      )
    })
  )
}
