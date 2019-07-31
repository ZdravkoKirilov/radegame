import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
    FetchGamesSuccess, FetchGamesFail, FetchGame, FetchGames,
    FetchImages, FetchImagesSuccess, FetchImagesFail
} from './actions';
import { GameFetchService } from '@app/core';
import { FETCH_GAMES, FETCH_GAME, FETCH_IMAGES } from './actionTypes';
import { toDictionary } from '@app/shared';
import { Game, ImageAsset } from '@app/game-mechanics';

@Injectable()
export class CatalogEffects {
    constructor(private actions$: Actions, private fetcher: GameFetchService) { }

    @Effect()
    fetchGames = this.actions$.pipe(
        ofType<FetchGames>(FETCH_GAMES),
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

    @Effect()
    fetchGame = this.actions$.pipe(
        ofType<FetchGame>(FETCH_GAME),
        mergeMap(action => {
            return this.fetcher.getGame(action.payload).pipe(
                map(response => {
                    const asDict = toDictionary<Game>([response]);
                    return new FetchGamesSuccess(asDict);
                }),
                catchError(() => {
                    return of(new FetchGamesFail());
                })
            )
        }),
    )

    @Effect()
    fetchImages = this.actions$.pipe(
        ofType<FetchImages>(FETCH_IMAGES),
        mergeMap(action => {
            return this.fetcher.getImages(action.payload).pipe(
                map(response => {
                    const asDict = toDictionary<ImageAsset>(response);
                    return new FetchImagesSuccess(asDict);
                }),
                catchError(() => {
                    return of(new FetchImagesFail());
                })
            )
        }),
    )
}