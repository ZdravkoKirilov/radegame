import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';

import { AppState } from '../../core/state/index';
import { GameEditorFeature } from '../state/reducers/index';
import { selectFeature } from '../state/reducers/selectors';
import * as actions from '../state/actions';
import { ROUTER_PARAMS } from '../../shared/config/config';

@Injectable()
export class GameDataGuard implements CanActivate {
    constructor(private store: Store<AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
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
                    if (!data.form.factions.items) {
                        this.store.dispatch(new actions.GetFactionsAction(gameId));
                    }
                    if (!data.form.fields.items) {

                    }
                }),
                filter((data: GameEditorFeature) => {
                    return !!data;
                }),
                take(1)
            );
    }
}
