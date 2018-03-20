import { Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { EditorWrapperComponent } from './containers/editor-wrapper/editor-wrapper.component';
import { SmartLaunchComponent } from './containers/smart-launch/smart-launch.component';
import { SmartQuestsComponent } from './containers/smart-quests/smart-quests.component';
import { SmartFactionsComponent } from './containers/smart-factions/smart-factions.component';
import { SmartResourcesComponent } from './containers/smart-resources/smart-resources.component';
import { SmartFieldsComponent } from './containers/smart-fields/smart-fields.component';
import { SmartRoundsComponent } from './containers/smart-rounds/smart-rounds.component';
import { SmartActivitiesComponent } from './containers/smart-activities/smart-activities.component';
import { SmartTriviaComponent } from './containers/smart-trivia/smart-trivia.component';
import { SmartStagesComponent } from './containers/smart-stages/smart-stages.component';
import { ROUTER_PARAMS } from '../shared';
import { GameDataResolver } from '../core';
import * as fromGuards from './guards';

export const routes: Routes = [
    {
        path: 'games/list',
        component: SmartLaunchComponent,
        pathMatch: 'full',
        canActivate: [fromGuards.GamesListGuard],
        data: {
            title: 'Radegast: create a new game'
        },
    }, {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/editor`,
        canActivate: [fromGuards.GameDataGuard],
        resolve: {
            preloaded: GameDataResolver
        },
        component: EditorWrapperComponent,
        data: {
            title: 'Radegast: setup a new game'
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: IndexComponent
            },
            {
                path: `stages/:${ROUTER_PARAMS.STAGE_ID}/fields`,
                component: SmartFieldsComponent,
                pathMatch: 'full'
            },
            {
                path: 'stages',
                component: SmartStagesComponent,
            },
            {
                path: 'trivia',
                component: SmartTriviaComponent
            },
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

