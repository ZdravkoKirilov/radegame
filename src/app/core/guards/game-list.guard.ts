import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import * as actions from '../state/actions';

import { AppState } from '../state';
import { toIndexedList } from '@app/shared';
import { GameEditService } from '../services';

@Injectable()
export class GameListGuard implements CanActivate {

    constructor(private store: Store<AppState>, private api: GameEditService) { }

    canActivate(): Observable<any> {
        return this.api.getGames().pipe(
            switchMap(data => {
                const games = toIndexedList(data);
                this.store.dispatch(new actions.SetGamesAction(games));
                return of(true);
            }),
            catchError((err) => {
                return of(false);
            })
        )
    }
}
