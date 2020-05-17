import { Omit } from '@app/shared';
import { StatefulComponent } from '@app/render-kit';

import { BaseModel, WithKeywords } from "./Base.model";
import { ExpressionFunc, ParamedExpressionFunc } from './Expression.model';

export enum SandboxType {
  'widget' = 'widget',
  'module' = 'module',
}

export type Sandbox = BaseModel & WithKeywords & Partial<{
  /* shared */
  type: SandboxType;
  global_state: string;
  own_data: string; // player data, preferences
  on_init: string; // assertions may go here

  /* widget only */
  load_data: string; // if there is no module but we need to load entities
  from_parent: string;
  from_node: string; // emulate a WidgetNode
}>;

export type RuntimeSandbox = Omit<Sandbox, 'global_state' | 'own_data' | 'on_init' | 'load_data' | 'from_parent' | 'from_node'> & Partial<{
  global_state: ExpressionFunc<{}>;
  own_data: ExpressionFunc<{}>;
  on_init: ParamedExpressionFunc<StatefulComponent, void>;

  load_data: ExpressionFunc<void>;
  from_parent: ExpressionFunc<{}>;
  from_node: ExpressionFunc<{}>
}>;