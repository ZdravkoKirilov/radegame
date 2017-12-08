import { Routes } from '@angular/router';

import { IndexComponent } from './containers/index/index.component';
import { SmartLaunchComponent } from './containers/smart-launch/smart-launch.component';
import { ROUTER_PARAMS } from '../shared/config/config';
import { GameResolverService } from './resolvers/game-resolver.service';
import { GamesListResolverService } from './resolvers/games-list-resolver.service';

export const routes: Routes = [
    {
        path: 'games/editor',
        component: SmartLaunchComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: create a new game'
        },
        resolve: {
            games: GamesListResolverService
        }
    },
    {
        path: `games/editor/:${ROUTER_PARAMS.GAME_ID}`,
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: setup a new game'
        },
        resolve: {
            game: GameResolverService
        }
    }
];
