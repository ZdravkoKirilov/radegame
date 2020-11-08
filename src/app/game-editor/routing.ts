import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { CustomRouteData } from '@app/core';

import { GamesEditorContainerComponent } from './containers/games-editor/games-editor-container.component';
import { VersionsListComponent } from './containers/versions-list/versions-list.component';
import { VersionsEditorComponent } from './containers/versions-editor/versions-editor.component';
import { TreeEditorComponent } from './containers/tree-editor/tree-editor.component';
import { GameDashboardComponent } from './containers/game-dashboard/game-dashboard.component';
import { composeSetupForm, composeModuleForm, composeTokenForm, composeImageForm, composeSoundForm, composeStyleForm, composeExpressionForm, composeShapeForm, composeSonataForm, composeTextForm, composeAnimationForm, composeWidgetForm, composeSonataStepForm, composeTextTranslationForm, composeAnimationStepForm, composeNodeForm, composeNodeHandlerForm, composeNodeLifecycleForm, composeTokenNodeForm } from './forms';
import { RootEntityEditorComponent } from './containers/root-entity-editor/root-entity-editor.component';
import { GamesContainerComponent } from './containers/games/games.container';
import { EntityEditorContainerComponent } from './containers/entity-editor/entity-editor-container.component';
import { NestedEntityEditorComponent } from './containers/nested-entity-editor/nested-entity-editor.component';
import { TestBoardContainerComponent } from './containers/sandbox-editor/test-board-container.component';
import { NodeEditorComponent } from './containers/node-editor/node-editor.component';
import { STORE_KEYS } from './utils';

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
          entityType: STORE_KEYS.setups,
          form: composeSetupForm
        }
      }, {
        path: `setups/:${ROUTER_PARAMS.SETUP_ID}`,
        component: RootEntityEditorComponent,
        data: <CustomRouteData>{
          entityType: STORE_KEYS.setups,
          form: composeSetupForm
        }
      }, {
        path: 'modules/add',
        component: RootEntityEditorComponent,
        data: <CustomRouteData>{
          entityType: STORE_KEYS.modules,
          form: composeModuleForm
        }
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}`,
        component: RootEntityEditorComponent,
        data: <CustomRouteData>{
          entityType: STORE_KEYS.modules,
          form: composeModuleForm
        }
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/sandboxes`,
        children: [
          {
            path: 'add',
            component: TestBoardContainerComponent,
            data: {
              entityType: STORE_KEYS.sandboxes
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
              entityType: STORE_KEYS.images,
              form: composeImageForm
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.images,
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
              entityType: STORE_KEYS.sounds,
              form: composeSoundForm
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.sounds,
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
              entityType: STORE_KEYS.styles,
              form: composeStyleForm(false),
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.styles,
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
              entityType: STORE_KEYS.expressions,
              form: composeExpressionForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.expressions,
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
              entityType: STORE_KEYS.shapes,
              form: composeShapeForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.shapes,
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
              entityType: STORE_KEYS.sonatas,
              form: composeSonataForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.sonatas,
              form: composeSonataForm,
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/steps/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.sonatas,
              form: composeSonataStepForm,
              nestedEntityType: 'steps'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/steps/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.sonatas,
              form: composeSonataStepForm,
              nestedEntityType: 'steps',
            }
          },
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/texts`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: STORE_KEYS.texts,
              form: composeTextForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.texts,
              form: composeTextForm,
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/translations/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.texts,
              form: composeTextTranslationForm,
              nestedEntityType: 'translations'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/translations/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.texts,
              form: composeTextTranslationForm,
              nestedEntityType: 'translations',
            }
          },
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/animations`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: STORE_KEYS.animations,
              form: composeAnimationForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.animations,
              form: composeAnimationForm,
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/steps/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.animations,
              form: composeAnimationStepForm,
              nestedEntityType: 'steps'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/steps/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.animations,
              form: composeAnimationStepForm,
              nestedEntityType: 'steps',
            }
          },
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/widgets`,
        children: [
          {
            path: 'add',
            component: EntityEditorContainerComponent,
            data: {
              entityType: STORE_KEYS.widgets,
              form: composeWidgetForm,
            } as CustomRouteData
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              form: composeWidgetForm,
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/add`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeForm
            }
          },
          {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}/handlers/add`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeHandlerForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}/handlers/:${ROUTER_PARAMS.NODE_HANDLER_ID}}`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeHandlerForm
            }
          },
          {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}/lifecycles/add`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeLifecycleForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NODE_ID}/lifecycles/:${ROUTER_PARAMS.NODE_LIFECYCLE_ID}}`,
            component: NodeEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.widgets,
              nestedEntityType: 'nodes',
              form: composeNodeLifecycleForm
            }
          },
        ]
      }, {
        path: `modules/:${ROUTER_PARAMS.MODULE_ID}/tokens`,
        children: [
          {
            path: `add`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.tokens,
              form: composeTokenForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}`,
            component: EntityEditorContainerComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.tokens,
              form: composeTokenForm
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/add`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.tokens,
              form: composeTokenNodeForm,
              nestedEntityType: 'nodes'
            }
          }, {
            path: `:${ROUTER_PARAMS.ENTITY_ID}/nodes/:${ROUTER_PARAMS.NESTED_ENTITY_ID}`,
            component: NestedEntityEditorComponent,
            data: <CustomRouteData>{
              entityType: STORE_KEYS.tokens,
              form: composeTokenNodeForm,
              nestedEntityType: 'nodes',
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

