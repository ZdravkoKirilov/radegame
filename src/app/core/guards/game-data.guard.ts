import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  of ,  forkJoin } from 'rxjs';
import { switchMap, catchError, map, take } from 'rxjs/operators';

import * as actions from '../state/actions';
import { selectPreloadedGameIds, Cache } from '../state';
import { toIndexedList, ROUTER_PARAMS } from '@app/shared';
import { GameEditService } from '../services';
import { GameTemplate, GameEntity } from '@app/game-mechanics';

@Injectable()
export class GameDataGuard implements CanActivate {

    constructor(private store: Store<Cache>, private api: GameEditService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];

        return this.getFromStoreOrAPI(gameId).pipe(
            switchMap((data: GameTemplate) => {
                if (data) {
                    this.store.dispatch(new actions.AddGameAssetsAction({
                        game: gameId, data
                    }));
                }
                return of(true);
            }),
            catchError(() => {
                return of(false);
            })
        )
    }

    getFromStoreOrAPI(gameId: number) {
        return this.store.select(selectPreloadedGameIds).pipe(
            take(1),
            switchMap(preloadedGames => {
                if (preloadedGames.includes(gameId.toString())) {
                    return of(null);
                } else {
                    return this.load(gameId)
                }
            })
        );
    }

    load(gameId: number): Observable<GameTemplate> {
        return forkJoin([
            this.api.getResources(gameId),
            this.api.getFactions(gameId),
            this.api.getActions(gameId),
            this.api.getRounds(gameId),
            this.api.getStages(gameId),
            this.api.getConditions(gameId),
            this.api.getFields(gameId),
            this.api.getMapLocations(gameId),
            this.api.getPaths(gameId),
            this.api.getChoices(gameId)
        ]).pipe(
            map(entities => entities.map(entity => toIndexedList(entity))),
            map(([resources, factions, activities, rounds, stages, quests, fields, locations, paths, trivia]) => {
                return {
                    resources, factions, activities, rounds, stages, quests, fields, locations, paths, trivia
                };
            }),
        );
    }
}
