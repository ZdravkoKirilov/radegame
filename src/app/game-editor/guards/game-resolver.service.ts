import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/forkJoin';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {Game} from '../../game-mechanics/models/index';
import {GameData} from '../../shared/models/GameData';
import {GameEditService} from '../../game-mechanics/services/game-edit.service';
import {ROUTER_PARAMS} from '../../game-mechanics/services/config';

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
            this.api.getFields(gameId)
        ]).map((res: any[]): GameData => {
            const game = res[0];
            const map = res[1][0];
            const locations = res[2];
            const paths = res[3];
            const fields = res[4];
            return {
                game, map, locations, paths, fields
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
