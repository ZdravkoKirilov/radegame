import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { CustomRouteData } from '@app/core';
import { ALL_ENTITIES } from '@app/game-mechanics';

import { GamesEditorContainerComponent } from './containers/games-editor/games-editor-container.component';
import { VersionsListComponent } from './containers/versions-list/versions-list.component';
import { VersionsEditorComponent } from './containers/versions-editor/versions-editor.component';
import { TreeEditorComponent } from './containers/tree-editor/tree-editor.component';
import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { composeSetupForm, composeModuleForm } from './forms';
import { RootEntityEditorComponent } from './containers/root-entity-editor/root-entity-editor.component';
import { GamesContainerComponent } from './containers/games/games.container';

export const routes: Routes = [
    {
        path: 'games/list',
        component: GamesContainerComponent,
        pathMatch: 'full',
        data: {
            title: 'Radegast: games list'
        },
    },
    {
        path: `games/edit/:${ROUTER_PARAMS.GAME_ID}`,
        component: GamesEditorContainerComponent,
        data: <CustomRouteData>{
            title: 'Radegast: edit game',
        }
    },
    {
        path: `games/add`,
        component: GamesEditorContainerComponent,
        data: <CustomRouteData>{
            title: 'Radegast: add game',
        }
    },
    {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/list`,
        component: VersionsListComponent,
        data: <CustomRouteData>{
            title: 'Radegast: versions list'
        }
    },
    {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/add`,
        component: VersionsEditorComponent,
        data: <CustomRouteData>{
            title: 'Radegast: add version'
        }
    },
    {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/edit/:${ROUTER_PARAMS.VERSION_ID}`,
        component: VersionsEditorComponent,
        data: <CustomRouteData>{
            title: 'Radegast: add version'
        }
    },
    {
        path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/:${ROUTER_PARAMS.VERSION_ID}`,
        component: TreeEditorComponent,
        children: [
            {
                path: 'setups/add',
                component: RootEntityEditorComponent,
                data: <CustomRouteData>{
                    entityType: ALL_ENTITIES.setups,
                    form: composeSetupForm
                }
            }, {
                path: `setups/:${ROUTER_PARAMS.SETUP_ID}`,
                component: RootEntityEditorComponent,
                data: <CustomRouteData>{
                    entityType: ALL_ENTITIES.setups,
                    form: composeSetupForm
                }
            }, {
                path: 'modules/add',
                component: RootEntityEditorComponent,
                data: <CustomRouteData>{
                    entityType: ALL_ENTITIES.modules,
                    form: composeModuleForm
                }
            }, {
                path: `modules/:${ROUTER_PARAMS.MODULE_ID}`,
                component: RootEntityEditorComponent,
                data: <CustomRouteData>{
                    entityType: ALL_ENTITIES.modules,
                    form: composeModuleForm
                }
            }, {
                path: 'dashboard',
                component: GameDashboardComponent,
            }, {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    },
];

