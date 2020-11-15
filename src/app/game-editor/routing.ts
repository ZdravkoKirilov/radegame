import { Routes } from '@angular/router';

import { ROUTER_PARAMS } from '@app/shared';
import { Module, Sandbox, Setup, Token } from '@app/game-mechanics';

import { STORE_KEYS } from './utils';
import { EditorRoutesData } from './state';

import { GamesEditorContainerComponent } from './containers/games-editor/games-editor-container.component';
import { VersionsListComponent } from './containers/versions-list/versions-list.component';
import { VersionsEditorComponent } from './containers/versions-editor/versions-editor.component';
import { TreeEditorComponent } from './containers/tree-editor/tree-editor.component';
import { composeSetupForm, composeModuleForm, composeSandboxForm, composeTokenForm } from './forms';
import { GamesContainerComponent } from './containers/games/games.container';
import { VersionedEntityEditorComponent } from './containers/versioned-entity-editor/versioned-entity-editor.component';
import { ModularEntityEditorComponent } from './containers/modular-entity-editor/modular-entity-editor.component';
import { SetupsListComponent } from './containers/setups-list/setups-list.component';

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
    data: {
      title: 'Radegast: edit game',
    }
  },
  {
    path: `games/add`,
    component: GamesEditorContainerComponent,
    data: {
      title: 'Radegast: add game',
    }
  },
  {
    path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/list`,
    component: VersionsListComponent,
    data: {
      title: 'Radegast: versions list'
    }
  },
  {
    path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/add`,
    component: VersionsEditorComponent,
    data: {
      title: 'Radegast: add version'
    }
  },
  {
    path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/edit/:${ROUTER_PARAMS.VERSION_ID}`,
    component: VersionsEditorComponent,
    data: {
      title: 'Radegast: add version'
    }
  },
  {
    path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/:${ROUTER_PARAMS.VERSION_ID}/setups`,
    data: <EditorRoutesData>{
      versionedEntity: Setup,
      form: composeSetupForm,
      storeSlice: STORE_KEYS.setups,
    },
    children: [
      { path: 'list', component: SetupsListComponent },
      { path: 'add', component: VersionedEntityEditorComponent },
      { path: `edit/:${ROUTER_PARAMS.VERSIONED_ENTITY_ID}`, component: VersionedEntityEditorComponent },
    ]
  },
  {
    path: `games/:${ROUTER_PARAMS.GAME_ID}/versions/:${ROUTER_PARAMS.VERSION_ID}`,
    component: TreeEditorComponent,
    children: [
      {
        path: 'modules',
        data: <EditorRoutesData>{
          versionedEntity: Module,
          form: composeModuleForm,
          storeSlice: STORE_KEYS.modules,
        },
        children: [
          { path: 'add', component: VersionedEntityEditorComponent },
          { path: `edit/:${ROUTER_PARAMS.VERSIONED_ENTITY_ID}`, component: VersionedEntityEditorComponent },
          {
            path: `:${ROUTER_PARAMS.VERSIONED_ENTITY_ID}`,
            children: [
              {
                path: 'sandboxes',
                data: <EditorRoutesData>{
                  modularEntity: Sandbox,
                  form: composeSandboxForm,
                  storeSlice: 'sandboxes'
                },
                children: [
                  { path: 'add', component: ModularEntityEditorComponent },
                  { path: `:${ROUTER_PARAMS.MODULAR_ENTITY_ID}`, component: ModularEntityEditorComponent }
                ]
              },
              {
                path: 'tokens',
                data: <EditorRoutesData>{
                  modularEntity: Token,
                  form: composeTokenForm,
                  storeSlice: 'tokens'
                },
                children: [
                  { path: 'add', component: ModularEntityEditorComponent },
                  { path: `:${ROUTER_PARAMS.MODULAR_ENTITY_ID}`, component: ModularEntityEditorComponent }
                ]
              }
            ]
          }
        ]
      },
    ]
  },
];

