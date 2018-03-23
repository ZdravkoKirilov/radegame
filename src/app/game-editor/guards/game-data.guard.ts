import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, tap, filter, take, catchError, map } from 'rxjs/operators';

import { AppState } from '../../core';
import { GameEditorFeature, selectFeature } from '../state';
import * as actions from '../state/actions';
import { ROUTER_PARAMS } from '../../shared';

import { selectPreloadedGames, Cache } from '../../core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { toIndexedList, isMapLocation } from '../../shared';
import { GameEditService } from '../../core';
import { GameTemplate } from '../../game-mechanics';

@Injectable()
export class GameDataGuard implements CanActivate {

    private hasFired = false;

    constructor(private store: Store<AppState>, private api: GameEditService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];

        return this.getFromStoreOrAPI(gameId).pipe(
            switchMap(() => {
                debugger;
                return of(true);
            }),
            catchError(() => {
                debugger;
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

    // canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    //     this.hasFired = false;
    //     const gameId = parseInt(route.params[ROUTER_PARAMS.GAME_ID], 10);
    //     if (gameId) {
    //         return this.getFromStoreOrAPI(gameId)
    //             .pipe(
    //             switchMap(() => of(true)),
    //             catchError(() => of(false))
    //             );
    //     }
    //     return of(true);
    // }

    // getFromStoreOrAPI(gameId: number): Observable<any> {
    //     return this.store
    //         .select(selectFeature)
    //         .pipe(
    //         tap((data: GameEditorFeature) => {
    //             if (!this.hasFired && !data.assets.preloadedGameIds.includes(gameId)) {
    //                 this.hasFired = true;
    //                 this.store.dispatch(new actions.GetGamesAction());
    //                 this.store.dispatch(new actions.GetFactionsAction(gameId));
    //                 this.store.dispatch(new actions.GetResourcesAction(gameId));
    //                 this.store.dispatch(new actions.GetFieldsAction(gameId));
    //                 this.store.dispatch(new actions.GetMapLocationsAction(gameId));
    //                 this.store.dispatch(new actions.GetMapPathsAction(gameId));
    //                 this.store.dispatch(new actions.GetQuestsAction(gameId));
    //                 this.store.dispatch(new actions.GetGameAction(gameId));
    //                 this.store.dispatch(new actions.GetActivitiesAction(gameId));
    //                 this.store.dispatch(new actions.GetRoundsAction(gameId));
    //                 this.store.dispatch(new actions.GetTriviasAction(gameId));
    //                 this.store.dispatch(new actions.GetStagesAction(gameId));
    //             }
    //         }),
    //         filter((data: GameEditorFeature) => {
    //             const hasFactions = !!data.form.factions.items;
    //             const hasResources = !!data.form.resources.items;
    //             const hasFields = !!data.form.fields.items;
    //             const hasLocations = !!data.form.map.items;
    //             const hasPaths = !!data.form.map.paths;
    //             const hasGame = !!data.assets.game;
    //             const hasActivities = !!data.form.activities.items;
    //             const hasQuests = !!data.form.quests.items;
    //             const hasRounds = !!data.form.rounds.items;
    //             const hasTrivia = !!data.form.trivia.items;
    //             const hasStages = !!data.form.stages.items;
    //             const hasGames = !!data.games.items;

    //             const isReady = hasFactions && hasFields && hasLocations && hasPaths
    //                 && hasGame && hasResources && hasActivities && hasQuests && hasRounds
    //                 && hasTrivia && hasStages && hasGames;

    //             if (isReady && !data.assets.preloadedGameIds.includes(gameId)) {
    //                 const preloadedGameIds = [...data.assets.preloadedGameIds, gameId];
    //                 this.store.dispatch(new actions.UpdateEditorAssetsAction(
    //                     { preloadedGameIds, }));
    //             }
    //             if (isReady) {
    //                 this.store.dispatch(new actions.UpdateEditorAssetsAction({
    //                     game: data.games.items[gameId],
    //                 }));
    //             }

    //             return isReady;
    //         }),
    //         take(1),
    //     );
    // }
}
