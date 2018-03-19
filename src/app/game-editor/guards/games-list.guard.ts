import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';

import { AppState } from '../../core';
import { GamesList, selectGamesFeature, shouldPreloadFeature } from '../state';
import * as actions from '../state/actions';

@Injectable()
export class GamesListGuard implements CanActivate {

    private hasFired = false;

    constructor(private store: Store<AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.hasFired = false;
        return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    getFromStoreOrAPI(): Observable<any> {
        return this.store.select(selectGamesFeature).pipe(
            tap((data: GamesList) => {
                if (!this.hasFired) {
                    this.hasFired = true;
                    if (shouldPreloadFeature(data)) {
                        this.store.dispatch(new actions.GetGamesAction());
                    }
                }
            }),
            filter((data: GamesList) => {
                return !!data.items;
            }),
            take(1)
        );
    }
}
