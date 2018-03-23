import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, switchMap, mergeMap, catchError, tap, take, filter } from 'rxjs/operators';

import { selectPreloadedGames, Cache } from '../state';
import { GameTemplate } from '../../game-mechanics';
import { GameEditService } from '../services';
import { toIndexedList, ROUTER_PARAMS, isMapLocation } from '../../shared';

@Injectable()
export class GameDataResolver implements Resolve<GameTemplate>{
    constructor(private api: GameEditService, private store: Store<Cache>) { }

    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];

        return this.getFromStoreOrAPI(gameId).pipe(
            switchMap(() => {
                debugger;
                return of(true);
            }),
            catchError(() => {
                return of(false);
            })
        )
    }

    getFromStoreOrAPI(gameId: number) {
        return this.store.select(selectPreloadedGames).pipe(
            switchMap(preloadedGames => {
                if (preloadedGames.includes(gameId)) {
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
            this.api.getActivities(gameId),
            this.api.getRounds(gameId),
            this.api.getStages(gameId),
            this.api.getQuests(gameId),
            this.api.getFields(gameId),
            this.api.getMapLocations(gameId),
            this.api.getPaths(gameId),
            this.api.getTrivias(gameId)
        ]).pipe(
            map(entities => entities.map(entity => {
                if (!isMapLocation(entity)) {
                    return toIndexedList(entity);
                }
                return toIndexedList(entity, 'field');
            })),
            map(([resources, factions, activities, rounds, stages, quests, fields, locations, paths, trivia]) => {
                debugger;
                return {
                    resources, factions, activities, rounds, stages, quests, fields, locations, paths, trivia
                };
            }),
        );
    }
}