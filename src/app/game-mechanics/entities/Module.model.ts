import { Omit } from '@app/shared';

import { BaseModel, WithBoard } from './Base.model';
import { ExpressionFunc } from './Expression.model';
import { Widget } from './Widget.model';
import { ExpressionContext } from '../models';
import { enrichEntity, parseAndBind } from '../helpers';

export type Module = BaseModel & WithBoard & Partial<{

  preload: string;
  load_done: string;
  loader: number;
}>;

export const Module = {
  toRuntime(context: ExpressionContext, module: Module) {
    return enrichEntity<Module, RuntimeModule>(context.conf, {
      board: 'widgets',
      loader: 'widgets',
      preload: src => parseAndBind(context)(src),
      load_done: src => parseAndBind(context)(src),
    }, module);
  }
}

export type RuntimeModule = Module & Omit<Module, 'preload' | 'load_done' | 'loader'> & {
  preload: ExpressionFunc<void>;
  load_done: ExpressionFunc<boolean>;
  loader: Widget;
  board: Widget;
};