import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { GameData, Game } from '../../game-mechanics/models/index';
import { GameEditService } from '../services/game-edit.service';
import { ROUTER_PARAMS } from '../../shared/config/config';
import { GameBoards } from '../../game-mechanics/configs/game-boards';
import { Movements } from '../../game-mechanics/configs/movements';
import { gameActions } from '../../game-mechanics/systems/activity/statics';

@Injectable()
export class GameResolverService implements Resolve<Game> {

    constructor(private api: GameEditService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];

        return Observable.forkJoin([
            this.api.getGame(gameId),
            // this.api.getMaps(gameId),
            // this.api.getMapLocations(gameId),
            // this.api.getPaths(gameId),
            // this.api.getFields(gameId),
            // this.api.getResources(gameId),
            //this.api.getFactions(gameId)
        ]).map(([game]: any[]): GameData => {
            //const map = maps[0];
            // locations = toIndexedList(locations, 'field');
            // paths = toIndexedList(paths);
            // fields = toIndexedList(fields);
            // resources = toIndexedList(resources);
            //factions = toIndexedList(factions);
            return {
                game,
                //factions,
                supportedMovements: GameBoards[game.boardType].allowedMovements,
                supportedActivities: GameBoards[game.boardType].supportedActions,
                activities: gameActions,
                movements: Movements
            };
        }).catch(() => {
            this.router.navigate(['/games/editor']);
            return of(null);
        });

    }
}
