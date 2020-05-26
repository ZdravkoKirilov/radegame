import { Omit } from '@app/shared';
import { StatefulComponent } from '@app/render-kit';

import { BaseModel, WithKeywords } from "./Base.model";
import { ExpressionFunc, ParamedExpressionFunc } from './Expression.model';
import { Widget } from './Widget.model';
import { Module } from './Module.model';
import { WidgetNode } from './WidgetNode.model';

export enum SandboxType {
  'widget' = 'widget',
  'module' = 'module',
  'node' = 'node',
}

export type Sandbox = BaseModel & WithKeywords & Partial<{
  /* shared */
  global_state: string;
  own_data: string; // player data, preferences
  on_init: string; // assertions may go here

  /* identifiers */
  widget: number;
  module: number;
  node: number;

  /* widget only */
  preload: string; // if there is no module but we need to load entities
  load_done: string; // checks if data has been downloaded
  from_parent: string;
}>;

export type RuntimeSandbox = Omit<Sandbox, 'global_state' | 'own_data' | 'on_init' | 'preload' | 'from_parent' | 'widget' | 'module'> & Partial<{
  global_state: ExpressionFunc<{}>;
  own_data: ExpressionFunc<{}>;
  on_init: ParamedExpressionFunc<StatefulComponent, void>;

  preload: ExpressionFunc<void>;
  load_done: ExpressionFunc<boolean>;
  from_parent: ExpressionFunc<{}>;

  node: WidgetNode;
  widget: Widget;
  module: Module;
}>;