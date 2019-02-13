import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';

import {
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent, FieldsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent,
    RoundsContainerComponent, StagesContainerComponent, ChoicesContainerComponent,
    TokensContainerComponent, PhasesContainerComponent, TeamsContainerComponent,
    BoardContainerComponent, SourcesContainerComponent, ImageAssetContainerComponent,
} from './containers';

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
                path: `stages/:${ROUTER_PARAMS.STAGE_ID}/map`,
                component: BoardContainerComponent,
                pathMatch: 'full'
            },
            {
                path: 'images',
                component: ImageAssetContainerComponent,
                data: {
                    title: 'Image entities'
                }
            },
            {
                path: 'stages',
                component: StagesContainerComponent,
            },
            {
                path: 'choices',
                component: ChoicesContainerComponent
            },
            {
                path: 'conditions',
                component: ConditionsContainerComponent
            },
            {
                path: 'rounds',
                component: RoundsContainerComponent
            },
            {
                path: 'actions',
                component: ActionsContainerComponent
            },
            {
                path: 'fields',
                component: FieldsContainerComponent
            },
            {
                path: 'factions',
                component: FactionsContainerComponent
            },
            {
                path: 'tokens',
                component: TokensContainerComponent
            },
            {
                path: 'phases',
                component: PhasesContainerComponent
            },
            {
                path: 'teams',
                component: TeamsContainerComponent
            },
            {
                path: 'sources',
                component: SourcesContainerComponent
            }, {
                path: '**',
                redirectTo: 'actions'
            }
        ]
    }
];

