import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';

import { GameEditService, GameFetchService } from '@app/core';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  FetchVersionDetails, versionActionTypes, SetVersion, FetchVersions, SetVersions, SaveVersion, DeleteVersion, RemoveVersion
} from '../actions';
import { toGameId } from '@app/game-mechanics';

@Injectable()
export class VersionEffectsService {

  constructor(private actions$: Actions, private api: GameEditService, private fetcher: GameFetchService, private snackbar: MatSnackBar,) {
  }

  @Effect()
  fetchVersion = this.actions$.pipe(
    ofType<FetchVersionDetails>(versionActionTypes.FETCH_VERSION_DETAILS),
    switchMap(action => this.fetcher.getVersion(action.payload.gameId, action.payload.versionId).pipe(
      map(version => new SetVersion({ version })),
      catchError(err => {
        return of({ type: 'ERRROR' });
      }),
    ))
  )

  @Effect()
  fetchVersions = this.actions$.pipe(
    ofType<FetchVersions>(versionActionTypes.FETCH_VERSIONS),
    switchMap(action => this.fetcher.getVersions(action.payload.gameId).pipe(
      map(versions => new SetVersions({ versions })),
      catchError(err => {
        return of({ type: 'ERROR' });
      }),
    ))
  )

  @Effect()
  saveVersion = this.actions$.pipe(
    ofType<SaveVersion>(versionActionTypes.SAVE_VERSION),
    switchMap(action => this.api.saveVersion(action.payload.version, toGameId(1)).pipe(
      map(version => {
        this.snackbar.open('Version was saved', 'Success', { duration: 3000 });
        return new SetVersion({ version });
      }),
      catchError(err => {
        this.snackbar.open('Version could not be saved', 'Error', { duration: 3000 });
        return of({ type: 'ERROR' });
      }),
    ))
  );

  @Effect()
  deleteVersion = this.actions$.pipe(
    ofType<DeleteVersion>(versionActionTypes.DELETE_VERSION),
    switchMap(action => this.api.deleteVersion(action.payload.version, toGameId(1)).pipe(
      map(() => {
        this.snackbar.open('Version was deleted', 'Success', { duration: 3000 });
        return new RemoveVersion({ version: action.payload.version });
      }),
      catchError(err => {
        this.snackbar.open('Version could not be deleted', 'Error', { duration: 3000 });
        return of({ type: 'ERROR' });
      }),
    ))
  )
}
