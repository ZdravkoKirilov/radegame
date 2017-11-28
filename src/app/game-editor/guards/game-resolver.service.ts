import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Game } from '../../game-mechanics/models/index';
import { GameData } from '../../game-mechanics/models/index';
import { GameEditService } from '../../game-mechanics/services/game-edit.service';
import { ROUTER_PARAMS } from '../../game-mechanics/configs/config';
import { GameBoards } from '../../game-mechanics/configs/game-boards';
import { Movements } from '../../game-mechanics/configs/movements';
import { GameActions } from '../../game-mechanics/configs/game-action';
import { formatBoardFields_input } from '../state/data-format/fields';

@Injectable()
export class GameResolverService implements Resolve<Game> {

    constructor(private api: GameEditService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<any> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];

        return Observable.forkJoin([
            this.api.getGame(gameId),
            this.api.getMaps(gameId),
            this.api.getMapLocations(gameId),
            this.api.getPaths(gameId),
            this.api.getFields(gameId),
            this.api.getResources(gameId),
        ]).map((res: any[]): GameData => {
            const game = res[0];
            const map = res[1][0];
            const locations = res[2];
            const paths = res[3];
            const fields = formatBoardFields_input(res[4]);
            const resources = res[5];
            return {
                game, map, locations, paths, fields, resources,
                supportedMovements: GameBoards[game.boardType].allowedMovements,
                supportedActions: GameBoards[game.boardType].supportedActions,
                actions: GameActions,
                movements: Movements
            };
        }).catch(() => {
            this.router.navigate(['/games/editor']);
            return of(null);
        });

    }

    // resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Game> {
    //     const gameId = route.params[ROUTER_PARAMS.GAME_ID];
    //     return this.api.getGame(gameId)
    //         .take(1)
    //         .map((game: Game) => {
    //             if (game) {
    //                 return game;
    //             } else {
    //                 this.router.navigate(['/games/editor']);
    //                 return of(null);
    //             }
    //         })
    //         .catch(() => {
    //             this.router.navigate(['/games/editor']);
    //             return of(null);
    //         });
    // }

}
