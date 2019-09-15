import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GameArenaService, GameFetchService } from '@app/core';
import {
  actionTypes, FetchActiveGame, FetchActiveGameSuccess,
  FetchActiveGameFail, FetchGameConfig, FetchGameConfigFail, FetchGameConfigSuccess
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
  getActiveGame = this.actions$.pipe(
    ofType<FetchActiveGame>(actionTypes.FETCH_ACTIVE_GAME),
    mergeMap(action => {
      return this.arenaApi.fetchActiveGame(action.payload).pipe(
        map(game => {
          return new FetchActiveGameSuccess(game);
        }),
        catchError(() => {
          return of(new FetchActiveGameFail());
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
