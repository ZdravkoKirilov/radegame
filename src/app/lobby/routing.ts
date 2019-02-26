import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';

export const routes: Routes = [

    {
        path: `lobbies/games/:${ROUTER_PARAMS.GAME_ID}`,
        component: LobbiesPageComponent,
        data: {
            title: 'Radegast: game lobbies'
        },
    },
];

