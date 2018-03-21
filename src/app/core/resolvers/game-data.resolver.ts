import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, catchError } from 'rxjs/operators';

import { GameTemplate } from '../../game-mechanics';
import { GameEditService } from '../services';
import { toIndexedList, ROUTER_PARAMS } from '../../shared';

@Injectable()
export class GameDataResolver implements Resolve<GameTemplate>{
    constructor(private api: GameEditService) { }

    resolve(
        route: ActivatedRouteSnapshot
    ): any {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];
        return forkJoin([
            this.api.getResources(gameId)
        ]).pipe(
            map(([resources]) => {
                return <GameTemplate>{
                    resources: toIndexedList(resources)
                };
            }),
            catchError(() => {
                return of(null);
            })
            );
    }
}