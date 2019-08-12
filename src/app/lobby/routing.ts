import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { LobbiesPageComponent } from './pages/lobbies-page/lobbies-page.component';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';

export const routes: Routes = [
    {
        path: `/games/:${ROUTER_PARAMS.GAME_ID}`,
        component: LobbiesPageComponent,
        data: {
            title: 'Radegast: game lobbies'
        },
    }, {
        path: `/games/:${ROUTER_PARAMS.GAME_ID}/:${ROUTER_PARAMS.LOBBY_NAME}`,
        component: LobbyPageComponent,
        data: {
            title: 'Radegast: game lobby'
        },
    }
];

