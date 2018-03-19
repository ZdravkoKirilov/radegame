import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import { GameTemplate } from '../../game-mechanics';
import { GameEditService } from '../services';
import { toIndexedList, ROUTER_PARAMS } from '../../shared';

@Injectable()
export class GameDataResolver implements Resolve<GameTemplate>{
    constructor(private api: GameEditService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];
        return forkJoin([
            this.api.getGames(),
            this.api.getResources(gameId)
        ]).pipe(
            map(([games, resources]) => {
                return of(<GameTemplate>{
                    games: toIndexedList(games),
                    resources: toIndexedList(resources)
                });
            }),
            catchError(error => {
                return of(null);
            })
        );
    }
}