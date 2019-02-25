import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { FetchGamesSuccess, FetchGamesFail, FetchGame, FetchGames, FetchImages, FetchImagesSuccess, FetchImagesFail, FetchLobbies, FetchLobbiesSuccess, FetchLobbiesFail } from './actions';
import { GameFetchService } from '@app/core';
import { FETCH_GAMES, FETCH_GAME, FETCH_IMAGES, FETCH_LOBBIES } from './actionTypes';
import { toDictionary } from '@app/shared';
import { Game, ImageAsset } from '@app/game-mechanics';
import { BrowseService } from '../services/browse.service';
import { Lobby } from '../models';

@Injectable()
export class BrowseEffects {
    constructor(private actions$: Actions, private fetcher: GameFetchService, private lobbyService: BrowseService) { }

    @Effect()
    fetchGames = this.actions$.ofType<FetchGames>(FETCH_GAMES).pipe(
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
    fetchGame = this.actions$.ofType<FetchGame>(FETCH_GAME).pipe(
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
    fetchImages = this.actions$.ofType<FetchImages>(FETCH_IMAGES).pipe(
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

    @Effect()
    fetchLobbies = this.actions$.ofType<FetchLobbies>(FETCH_LOBBIES).pipe(
        mergeMap(action => {
            return this.lobbyService.fetchLobbies().pipe(
                map(response => {
                    const asDict = toDictionary<Lobby>(response);
                    return new FetchLobbiesSuccess(asDict);
                }),
                catchError(() => {
                    return of(new FetchLobbiesFail());
                })
            )
        })
    )
}