import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { CustomRouteData } from '@app/core';
import { SandboxType } from '@app/game-mechanics';

import {
    EditorContainerComponent,
    GamesContainerComponent,
    ModulesContainerComponent, WidgetsContainerComponent, ChoicesContainerComponent,
    TokensContainerComponent,
    BoardContainerComponent, ImageAssetContainerComponent,
} from './containers';
import { StylesContainerComponent } from './containers/styles/styles-container.component';
import { SoundsContainerComponent } from './containers/sounds/sounds-container.component';
import { ExpressionsContainerComponent } from './containers/expressions/expressions-container.component';
import { AnimationsContainerComponent } from './containers/animations/animations-container.component';
import { SetupsContainerComponent } from './containers/setups/setups-container.component';
import { TransitionsContainerComponent } from './containers/transitions/transitions-container.component';
import { TextsContainerComponent } from './containers/texts/texts-container.component';
import { SonatasContainerComponent } from './containers/sonata/sonatas-container.component';
import { ShapesContainerComponent } from './containers/shapes/shapes-container.component';
import { TestBoardContainerComponent } from './containers/test-board/test-board-container.component';
import { SandboxesContainerComponent } from './containers/sandboxes/sandboxes-container.component';

export const routes: Routes = [
    {
        path: 'games/list',
        component: GamesContainerComponent,
        pathMatch: 'full',
        data: {
            title: 'Radegast: create a new game'
        },
    }, {
        path: `games/:${ROUTER_PARAMS.GAME_ID}`,
        component: EditorContainerComponent,
        data: {
            title: 'Radegast: setup a new game'
        },
        children: [
            {
                path: `widgets/:${ROUTER_PARAMS.WIDGET_ID}/stage`,
                component: BoardContainerComponent,
                pathMatch: 'full'
            },
            {
                path: `widgets/:${ROUTER_PARAMS.WIDGET_ID}/live-test`,
                component: TestBoardContainerComponent,
                pathMatch: 'full',
                data: <CustomRouteData>{
                    sandbox_type: SandboxType.widget
                }
            },
            {
                path: `widgets/:${ROUTER_PARAMS.WIDGET_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}/live-test`,
                component: TestBoardContainerComponent,
                pathMatch: 'full',
                data: <CustomRouteData>{
                    sandbox_type: SandboxType.node
                }
            },
            {
                path: `modules/:${ROUTER_PARAMS.MODULE_ID}/live-test`,
                component: TestBoardContainerComponent,
                pathMatch: 'full',
                data: <CustomRouteData>{
                    sandbox_type: SandboxType.module
                }
            },
            {
                path: `sandboxes/:${ROUTER_PARAMS.SANDBOX_ID}/live-test`,
                component: TestBoardContainerComponent,
                pathMatch: 'full',
            },
            {
                path: 'images',
                component: ImageAssetContainerComponent,
                data: {
                    title: 'Image entities'
                }
            },
            {
                path: 'widgets',
                component: WidgetsContainerComponent,
            },
            {
                path: 'sandboxes',
                component: SandboxesContainerComponent,
            },
            {
                path: 'choices',
                component: ChoicesContainerComponent
            },
            {
                path: 'modules',
                component: ModulesContainerComponent
            },
            {
                path: 'expressions',
                component: ExpressionsContainerComponent
            },
            {
                path: 'tokens',
                component: TokensContainerComponent
            },
            {
                path: 'styles',
                component: StylesContainerComponent
            },
            {
                path: 'setups',
                component: SetupsContainerComponent
            },
            {
                path: 'sounds',
                component: SoundsContainerComponent
            },
            {
                path: 'animations',
                component: AnimationsContainerComponent
            },
            {
                path: 'transitions',
                component: TransitionsContainerComponent
            },
            {
                path: 'texts',
                component: TextsContainerComponent
            },
            {
                path: 'shapes',
                component: ShapesContainerComponent
            },
            {
                path: 'sonatas',
                component: SonatasContainerComponent
            },
            {
                path: '**',
                redirectTo: 'widgets'
            }
        ]
    }
];

