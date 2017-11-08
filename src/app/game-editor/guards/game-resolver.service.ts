import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {Game} from '../../game-mechanics/models/index';
import {GameEditService} from '../../shared/services/game-edit.service';
import {ROUTER_PARAMS} from '../../shared/config/config';

@Injectable()
export class GameResolverService implements Resolve<Game> {

    constructor(private api: GameEditService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Game> {
        const gameId = route.params[ROUTER_PARAMS.GAME_ID];
        return this.api.getGame(gameId)
            .take(1)
            .map((game: Game) => {
                if (game) {
                    return game;
                } else {
                    this.router.navigate(['/games/editor']);
                    return of(null);
                }
            })
            .catch(error => {
                this.router.navigate(['/games/editor']);
                return of(null);
            });
    }

}
