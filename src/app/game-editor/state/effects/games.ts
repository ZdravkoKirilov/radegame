import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import { formatGameConfigData } from '@app/shared';

import {
  gameActionTypes, FetchGameData, SetGameData, FetchGamesAction, SetGamesAction, SaveGameAction, SetGameAction, DeleteGameAction, RemoveGameAction
} from '../actions';

@Injectable()
export class GameEffectsService {

  constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService) {
  }

  @Effect()
  fetchGameData = this.actions$.pipe(
    ofType<FetchGameData>(gameActionTypes.FETCH_GAME_DATA),
    map(action => this.fetcher.getGameData(action.payload.gameId).pipe(
      map(response => {
        const payload = formatGameConfigData(response);
        return new SetGameData({ data: payload });
      }),
      catchError(err => null),
    ))
  )

  @Effect()
  fetchGames = this.actions$.pipe(
    ofType<FetchGamesAction>(gameActionTypes.FETCH_GAMES),
    map(action => this.fetcher.getGames().pipe(
      map(games => new SetGamesAction({ games })),
      catchError(err => {
        return null;
      })
    ))
  );

  @Effect()
  saveGame = this.actions$.pipe(
    ofType<SaveGameAction>(gameActionTypes.SAVE_GAME),
    map(action => this.api.saveGame(action.payload.game).pipe(
      map(game => new SetGameAction({ game })),
      catchError(err => null),
    ))
  );

  @Effect()
  deleteGame = this.actions$.pipe(
    ofType<DeleteGameAction>(gameActionTypes.DELETE_GAME),
    map(action => this.api.deleteGame(action.payload.game).pipe(
      map(() => new RemoveGameAction({ game: action.payload.game })),
      catchError(err => null),
    ))
  )
}
