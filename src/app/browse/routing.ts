import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { GamesListPage } from './pages/games-list/games-list.component';
import { GameDetailsPage } from './pages/game-details/game-details.component';
import { SetupDetailsPageComponent } from './pages/setup-details/setup-details-page.component';


export const routes: Routes = [
    {
        path: 'browse/games',
        component: GamesListPage,
        pathMatch: 'full',
        data: {
            title: 'Radegast: browse games'
        },
    },
    {
        path: `browse/games/:${ROUTER_PARAMS.GAME_ID}/setups/:${ROUTER_PARAMS.SETUP_ID}`,
        component: SetupDetailsPageComponent,
        data: {
            title: 'Radegast: review setup details'
        },
    },
    {
        path: `browse/games/:${ROUTER_PARAMS.GAME_ID}`,
        component: GameDetailsPage,
        data: {
            title: 'Radegast: review game details'
        },
    },
];

