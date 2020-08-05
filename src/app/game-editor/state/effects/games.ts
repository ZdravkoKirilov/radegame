import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import { formatGameConfigData } from '@app/shared';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  gameActionTypes, FetchGameData, SetGameData, FetchGamesAction, SetGamesAction, SaveGameAction, SetGameAction, DeleteGameAction, RemoveGameAction, FetchGameDetails
} from '../actions';

@Injectable()
export class GameEffectsService {

  constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService, private snackbar: MatSnackBar,) {
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
  fetchGame = this.actions$.pipe(
    ofType<FetchGameDetails>(gameActionTypes.FETCH_GAME_DETAILS),
    switchMap(action => this.fetcher.getGame(action.payload.gameId).pipe(
      map(game => new SetGameAction({ game })),
      catchError(err => {
        return of({ type: 'ERRROR' });
      }),
    ))
  )

  @Effect()
  fetchGames = this.actions$.pipe(
    ofType<FetchGamesAction>(gameActionTypes.FETCH_GAMES),
    switchMap(action => this.fetcher.getGames().pipe(
      map(games => new SetGamesAction({ games })),
      catchError(err => {
        return of({ type: 'ERROR' });
      }),
    ))
  )

  @Effect()
  saveGame = this.actions$.pipe(
    ofType<SaveGameAction>(gameActionTypes.SAVE_GAME),
    switchMap(action => this.api.saveGame(action.payload.game).pipe(
      map(game => {
        this.snackbar.open('Game was saved', 'Success', { duration: 3000 });
        return new SetGameAction({ game });
      }),
      catchError(err => {
        this.snackbar.open('Game could not be saved', 'Error', { duration: 3000 });
        return of({ type: 'ERROR' });
      }),
    ))
  );

  @Effect()
  deleteGame = this.actions$.pipe(
    ofType<DeleteGameAction>(gameActionTypes.DELETE_GAME),
    switchMap(action => this.api.deleteGame(action.payload.game).pipe(
      map(() => {
        this.snackbar.open('Game was deleted', 'Success', { duration: 3000 });
        return new RemoveGameAction({ game: action.payload.game });
      }),
      catchError(err => {
        this.snackbar.open('Game could not be deleted', 'Error', { duration: 3000 });
        return of({ type: 'ERROR' });
      }),
    ))
  )
}
