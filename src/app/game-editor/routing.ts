import { Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { SmartLaunchComponent } from './containers/smart-launch/smart-launch.component';
import { SmartQuestsComponent } from './containers/smart-quests/smart-quests.component';
import { SmartFactionsComponent } from './containers/smart-factions/smart-factions.component';
import { SmartResourcesComponent } from './containers/smart-resources/smart-resources.component';
import { SmartFieldsComponent } from './containers/smart-fields/smart-fields.component';
import { SmartRoundsComponent } from './containers/smart-rounds/smart-rounds.component';
import { SmartActivitiesComponent } from './containers/smart-activities/smart-activities.component';
import { ROUTER_PARAMS } from '../shared/config/config';
import { GamesListResolverService } from './resolvers/games-list-resolver.service';
import * as fromGuards from './guards';

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
    }, {
        path: `games/editor/:${ROUTER_PARAMS.GAME_ID}`,
        component: IndexComponent,
        canActivate: [fromGuards.GameDataGuard],
        data: {
            title: 'Radegast: setup a new game'
        },
        children: [
            {
                path: 'quests',
                component: SmartQuestsComponent
            },
            {
                path: 'rounds',
                component: SmartRoundsComponent
            },
            {
                path: 'activities',
                component: SmartActivitiesComponent
            },
            {
                path: 'resources',
                component: SmartResourcesComponent
            },
            {
                path: 'fields',
                component: SmartFieldsComponent
            },
            {
                path: 'factions',
                component: SmartFactionsComponent
            }
        ]
    }
];

