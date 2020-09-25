import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { CustomRouteData } from '@app/core';
import { ALL_ENTITIES } from '@app/game-mechanics';

import { GamesEditorContainerComponent } from './containers/games-editor/games-editor-container.component';
import { VersionsListComponent } from './containers/versions-list/versions-list.component';
import { VersionsEditorComponent } from './containers/versions-editor/versions-editor.component';
import { TreeEditorComponent } from './containers/tree-editor/tree-editor.component';
import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { composeSetupForm, composeModuleForm, composeTokenForm, composeImageForm, composeSoundForm, composeStyleForm, composeExpressionForm, composeShapeForm, composeSonataForm, composeTextForm, composeAnimationForm, composeWidgetForm } from './forms';
import { RootEntityEditorComponent } from './containers/root-entity-editor/root-entity-editor.component';
import { GamesContainerComponent } from './containers/games/games.container';
import { EntityEditorContainerComponent } from './containers/entity-editor/entity-editor-container.component';
import { NestedEntityEditorComponent } from './containers/nested-entity-editor/nested-entity-editor.component';
import { composeFrameForm, composeNestedTextForm } from './forms/helpers';
import { TestBoardContainerComponent } from './containers/sandbox-editor/test-board-container.component';

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
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/sandboxes`,
        children: [
          {
            path: 'add',
            component: TestBoardContainerComponent,
            data: {
              entityType: ALL_ENTITIES.sandboxes
            } as CustomRouteData
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/images`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.images,
              form: composeImageForm
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.images,
              form: composeImageForm
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/sounds`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.sounds,
              form: composeSoundForm
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.sounds,
              form: composeSoundForm
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/styles`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.styles,
              form: composeStyleForm(false),
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.styles,
              form: composeStyleForm(false),
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/expressions`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.expressions,
              form: composeExpressionForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.expressions,
              form: composeExpressionForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/shapes`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.shapes,
              form: composeShapeForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.shapes,
              form: composeShapeForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/sonatas`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.sonatas,
              form: composeSonataForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.sonatas,
              form: composeSonataForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/texts`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.texts,
              form: composeTextForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.texts,
              form: composeTextForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/animations`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.animations,
              form: composeAnimationForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.animations,
              form: composeAnimationForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/widgets`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: ALL_ENTITIES.widgets,
              form: composeWidgetForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.widgets,
              form: composeWidgetForm,
            }
          }
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/tokens`,
        children: [
          {
            path: `add`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeTokenForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeTokenForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/texts/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeNestedTextForm,
              nestedEntityType: 'texts'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/texts/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeNestedTextForm,
              nestedEntityType: 'texts',
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/frames/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeFrameForm,
              nestedEntityType: 'frames'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/frames/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: ALL_ENTITIES.tokens,
              form: composeFrameForm,
              nestedEntityType: 'frames',
            }
          }
        ]
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

