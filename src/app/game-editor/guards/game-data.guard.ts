import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';

import { AppState } from '../../core/state/index';
import { GameEditorFeature } from '../state/reducers/index';
import { selectFeature } from '../state/reducers/selectors';
import * as actions from '../state/actions';
import { ROUTER_PARAMS } from '../../shared/config/config';

import 'rxjs/add/operator/take';

@Injectable()
export class GameDataGuard implements CanActivate {

    private hasFired = false;

    constructor(private store: Store<AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.hasFired = false;
        const gameId = parseInt(route.params[ROUTER_PARAMS.GAME_ID], 10);
        if (gameId) {
            return this.getFromStoreOrAPI(gameId)
                .pipe(
                    switchMap(() => of(true)),
                    catchError(() => of(false))
                );
        }
        return of(true);
    }

    getFromStoreOrAPI(gameId: number): Observable<any> {
        return this.store
            .select(selectFeature)
            .pipe(
                tap((data: GameEditorFeature) => {
                    if (!this.hasFired) {
                        if (!data.form.factions.items) {
                            this.store.dispatch(new actions.GetFactionsAction(gameId));
                        }
                        if (!data.form.resources.items) {
                            this.store.dispatch(new actions.GetResourcesAction(gameId));
                        }
                        if (!data.form.fields.items) {
                            this.store.dispatch(new actions.GetFieldsAction(gameId));
                        }
                        if (!data.form.map.items) {
                            this.store.dispatch(new actions.GetMapLocationsAction(gameId));
                        }
                        if (!data.form.map.paths) {
                            this.store.dispatch(new actions.GetMapPathsAction(gameId));
                        }
                        if (!data.form.quests.items) {
                            this.store.dispatch(new actions.GetQuestsAction(gameId));
                        }
                        if (!data.form.map.canvas.image) {
                            this.store.dispatch(new actions.GetMapAction(gameId));
                        }
                        if (!data.assets.game) {
                            this.store.dispatch(new actions.GetGameAction(gameId));
                        }
                        if (!data.form.activities.items) {
                            this.store.dispatch(new actions.GetActivitiesAction(gameId));
                        }
                        if (!data.form.rounds.items) {
                            this.store.dispatch(new actions.GetRoundsAction(gameId));
                        }
                        this.hasFired = true;
                    }
                }),
                filter((data: GameEditorFeature) => {
                    const hasFactions = !!data.form.factions.items;
                    const hasResources = !!data.form.resources.items;
                    const hasFields = !!data.form.fields.items;
                    const hasLocations = !!data.form.map.items;
                    const hasPaths = !!data.form.map.paths;
                    const hasMap = !!data.form.map.canvas.id;
                    const hasGame = !!data.assets.game;
                    const hasActivities = !!data.form.activities.items;
                    const hasQuests = !!data.form.quests.items;
                    const hasRounds = !!data.form.rounds.items;

                    return hasFactions && hasFields && hasLocations && hasPaths && hasMap
                        && hasGame && hasResources && hasActivities && hasQuests && hasRounds;
                }),
                take(1)
            );
    }
}
