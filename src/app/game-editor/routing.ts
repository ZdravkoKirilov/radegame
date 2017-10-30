import {Routes} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {SmartLaunchComponent} from './containers/smart-launch/smart-launch.component';
import {ROUTER_PARAMS} from '../shared/config/config';

export const routes: Routes = [
    {
        path: 'games/editor',
        component: SmartLaunchComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: create a new game'
        },
    },
    {
        path: `games/editor/:${ROUTER_PARAMS.GAME_NAME}`,
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: setup a new game'
        },
    }
];
