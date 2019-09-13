import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { GameArenaService } from '@app/core';
import { actionTypes, FetchActiveGame, FetchActiveGameSuccess, FetchActiveGameFail } from '../actions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArenaEffectsService {

  constructor(
    private actions$: Actions,
    private arenaApi: GameArenaService
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
}
