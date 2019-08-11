import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';

import {
    EditorContainerComponent, ActionsContainerComponent, FactionsContainerComponent, FieldsContainerComponent,
    GamesContainerComponent, ConditionsContainerComponent,
    RoundsContainerComponent, StagesContainerComponent, ChoicesContainerComponent,
    TokensContainerComponent, PhasesContainerComponent, TeamsContainerComponent,
    BoardContainerComponent, SourcesContainerComponent, ImageAssetContainerComponent,
} from './containers';
import { KeywordsContainerComponent } from './containers/keywords/keywords-container.component';
import { GroupsContainerComponent } from './containers/groups/groups-container.component';
import { StylesContainerComponent } from './containers/styles/styles-container.component';
import { SoundsContainerComponent } from './containers/sounds/sounds-container.component';
import { StatesContainerComponent } from './containers/states/states-container.component';
import { ExpressionsContainerComponent } from './containers/expressions/expressions-container.component';
import { AnimationsContainerComponent } from './containers/animations/animations-container.component';
import { HandlersContainerComponent } from './containers/handlers/handlers-container.component';

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
                path: 'expressions',
                component: ExpressionsContainerComponent
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
            },
            {
                path: 'keywords',
                component: KeywordsContainerComponent
            },
            {
                path: 'groups',
                component: GroupsContainerComponent
            },
            {
                path: 'styles',
                component: StylesContainerComponent
            },
            {
                path: 'sounds',
                component: SoundsContainerComponent
            },
            {
                path: 'states',
                component: StatesContainerComponent
            },
            {
                path: 'animations',
                component: AnimationsContainerComponent
            },
            {
                path: 'handlers',
                component: HandlersContainerComponent
            },
            {
                path: '**',
                redirectTo: 'actions'
            }
        ]
    }
];

