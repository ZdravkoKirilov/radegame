import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/forkJoin';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router, Resolve } from '@angular/router';

import { GameEditService } from '../services/game-edit.service';
import { Game } from '../../game-mechanics/models/index';
import { toIndexedList } from '../../shared/utils/utils';

@Injectable()
export class GamesListResolverService implements Resolve<any> {

    constructor(private api: GameEditService, private router: Router) {
    }

    resolve(): Observable<any> {
        return this.api.getGames()
            .map((games: Game[]) => {
                return toIndexedList(games);
            })
            .catch(err => {
                this.router.navigate(['/']);
                return of(null);
            });

    }
}
