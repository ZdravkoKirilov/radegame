import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, Store } from '@ngrx/store';

import { AppState, GameEditService, GameFetchService } from '@app/core';
import { Game } from '@app/game-mechanics';

import {
  gameActionTypes, FetchGameData, FetchGamesAction, SetGamesAction, SaveGameAction, SetGameAction, DeleteGameAction, RemoveGameAction, FetchGameDetails, SetGameData, AddLoadedModules
} from '../actions';
import { selectLoadedModules } from '../selectors';

@Injectable()
export class GameEffectsService {

  constructor(
    private actions$: Actions,
    private api: GameEditService,
    private fetcher: GameFetchService,
    private snackbar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  @Effect()
  fetchGameData = this.actions$.pipe(
    ofType<FetchGameData>(gameActionTypes.FETCH_GAME_DATA),
    withLatestFrom(this.store.select(selectLoadedModules)),
    switchMap(([action, loaded_modules]) => {
      const { gameId, module } = action.payload;
      const actions: Action[] = [];
      const moduleIds = [...module.dependencies, module.id].filter(moduleId => !loaded_modules.includes(moduleId));

      if (moduleIds.length) {
        return this.fetcher.getGameData(gameId, moduleIds).pipe(
          switchMap(response => {
            this.snackbar.open(`Fetched game data`, 'Success', { duration: 3000 });
            return [
              new SetGameData({ data: response }),
              ...actions,
              new AddLoadedModules({ modules: moduleIds })
            ];
          }),
          catchError(() => {
            this.snackbar.open(`Failed to fetch game data`, 'Error', { duration: 3000 });
            return [];
          })
        )
      }
      return [];
    })
  )

  @Effect()
  fetchGame = this.actions$.pipe(
    ofType<FetchGameDetails>(gameActionTypes.FETCH_GAME_DETAILS),
    switchMap(action => this.fetcher.getGame(action.payload.gameId).pipe(
      map(game => new SetGameAction({ game })),
      catchError(() => {
        return of({ type: 'ERRROR' });
      }),
    ))
  )

  @Effect()
  fetchGames = this.actions$.pipe(
    ofType<FetchGamesAction>(gameActionTypes.FETCH_GAMES),
    switchMap(_action => this.fetcher.getGames().pipe(
      map(games => new SetGamesAction({ games })),
      catchError(() => {
        return of({ type: 'ERROR' });
      }),
    ))
  )

  @Effect()
  saveGame = this.actions$.pipe(
    ofType<SaveGameAction>(gameActionTypes.SAVE_GAME),
    switchMap(action => this.api.saveGame(action.payload.game).pipe(
      map((game: Game) => {
        this.snackbar.open('Game was saved', 'Success', { duration: 3000 });
        return new SetGameAction({ game });
      }),
      catchError(() => {
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
      catchError(() => {
        this.snackbar.open('Game could not be deleted', 'Error', { duration: 3000 });
        return of({ type: 'ERROR' });
      }),
    ))
  )
}
