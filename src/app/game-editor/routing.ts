import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';

import {
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent, FieldsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent, ResourcesContainerComponent, RoundsContainerComponent, StagesContainerComponent, ChoicesContainerComponent
} from './containers';
import { IndexComponent } from './components';

export const routes: Routes = [
    {
        path: 'games/list',
        component: GamesContainerComponent,
        pathMatch: 'full',
        data: {
            title: 'Radegast: create a new game'
        },
    }, {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/editor`,
        component: EditorContainerComponent,
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
                component: FieldsContainerComponent,
                pathMatch: 'full'
            },
            {
                path: 'stages',
                component: StagesContainerComponent,
            },
            {
                path: 'trivia',
                component: ChoicesContainerComponent
            },
            {
                path: 'quests',
                component: ConditionsContainerComponent
            },
            {
                path: 'rounds',
                component: RoundsContainerComponent
            },
            {
                path: 'activities',
                component: ActionsContainerComponent
            },
            {
                path: 'resources',
                component: ResourcesContainerComponent
            },
            {
                path: 'fields',
                component: FieldsContainerComponent
            },
            {
                path: 'factions',
                component: FactionsContainerComponent
            }
        ]
    }
];

