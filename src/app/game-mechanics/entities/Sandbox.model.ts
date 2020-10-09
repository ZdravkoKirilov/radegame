import { Omit, Nominal } from 'simplytyped';

import { StatefulComponent } from '@app/render-kit';
import { Tagged } from '@app/shared';

import { GameEntityParser } from "./Base.model";
import { ExpressionFunc, ParamedExpressionFunc } from './Expression.model';
import { toWidgetId, Widget, WidgetId } from './Widget.model';
import { Module, ModuleId, toModuleId } from './Module.model';
import { toNodeId, WidgetNode, WidgetNodeId } from './WidgetNode.model';
import { enrichEntity, parseAndBind } from '../helpers';
import { Token, TokenId, toTokenId } from './Token.model';
import { omit, values } from 'lodash/fp';
import { AnimationId } from './Animation.model';
import { TextId } from './Text.model';
import { ShapeId } from './Shape.model';
import { ImageAsset } from './ImageAsset.model';

export enum SandboxType {
  'widget' = 'widget',
  'module' = 'module',
  'node' = 'node',
  'token' = 'token',
};

export type SandboxId = Nominal<string, 'SandboxId'>;
const toSandboxid = (source: unknown) => String(source) as SandboxId;

export type Sandbox = Tagged<'Sandbox', {
  id: SandboxId;
  name: string;
  description: string;
  /* shared */
  global_state: string;
  own_data: string; // player data, preferences
  on_init: string; // assertions may go here

  /* identifiers */
  widget: WidgetId;
  node: WidgetNodeId;
  token: TokenId;
  module: ModuleId;

/*   animation: {
    animationId: AnimationId;
    text: TextId;
    shape: ShapeId;
    image: ImageAsset;
  } */

  from_parent: string;
}>;

type DtoSandbox = Omit<Sandbox, '__tag' | 'id' | 'widget' | 'node' | 'token' | 'module'> & {
  id: number;

  widget: number;
  node: number;
  token: number;
  module: number;
};

export type RuntimeSandbox = Omit<Sandbox, 'global_state' | 'own_data' | 'on_init' | 'from_parent' | 'widget' | 'module' | 'token'> & Partial<{

  global_state: ExpressionFunc<{}>;
  own_data: ExpressionFunc<{}>;
  on_init: ParamedExpressionFunc<StatefulComponent, void>;

  from_parent: ExpressionFunc<{}>;

  node: WidgetNode;
  widget: Widget;
  module: Module;
  token: Token;
}>;

export const Sandbox: GameEntityParser<Sandbox, DtoSandbox, RuntimeSandbox> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Sandbox',
      id: toSandboxid(dto.id),
      module: toModuleId(dto.module),
      token: toTokenId(dto.token),
      widget: toWidgetId(dto.widget),
      node: toNodeId(dto.node),
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
      token: Number(entity.token),
      widget: Number(entity.widget),
      node: Number(entity.node),
    };
  },

  toRuntime(context, sandbox) {

    return enrichEntity<Sandbox, RuntimeSandbox>(context.conf, {

      global_state: src => parseAndBind(context)(src),
      own_data: src => parseAndBind(context)(src),
      on_init: src => parseAndBind(context)(src),
      from_parent: src => parseAndBind(context)(src),

      node: (nodeId: WidgetNodeId) => {
        const widgets = context.conf.widgets;
        return values(widgets)
          .reduce<WidgetNode[]>((allNodes, widget) => { return [...allNodes, ...widget.nodes] }, [])
          .find(node => node.id === nodeId)
      },
      widget: 'widgets',
      module: 'modules',
      token: 'tokens',
    }, sandbox);

  }
}