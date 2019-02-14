import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { BrowseAction, FetchGamesSuccess, FetchGamesFail } from './actions';
import { GameFetchService } from '@app/core';
import { FETCH_GAMES } from './actionTypes';
import { toDictionary } from '@app/shared';
import { Game } from '@app/game-mechanics';


export class BrowseEffects {
    constructor(private actions$: Actions, private fetcher: GameFetchService) { }

    @Effect()
    fetchGames = this.actions$.ofType<BrowseAction>(FETCH_GAMES).pipe(
        mergeMap(action => {
            return this.fetcher.getGames().pipe(
                map(response => {
                    const asDict = toDictionary<Game>(response);
                    return new FetchGamesSuccess(asDict);
                }),
                catchError(() => {
                    return of(new FetchGamesFail());
                })
            )
        }),
    )
}