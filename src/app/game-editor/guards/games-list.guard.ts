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

@Injectable()
export class GamesListGuard implements CanActivate {

    private hasFired = false;

    constructor(private store: Store<AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.hasFired = false;

        return this.getFromStoreOrAPI()
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
    }

    getFromStoreOrAPI(): Observable<any> {
        return this.store
            .select(selectFeature)
            .pipe(
                tap((data: GameEditorFeature) => {
                    if (!this.hasFired) {
                        if (!data.games.items) {
                            this.store.dispatch(new actions.GetGamesAction());
                        }
                        this.hasFired = true;
                    }
                }),
                filter((data: GameEditorFeature) => {
                    return !!data.games.items;
                }),
                take(1)
            );
    }
}
