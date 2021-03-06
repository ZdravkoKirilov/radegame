import { Omit, Nominal } from 'simplytyped';

import { BaseModel, WithBoard } from './Base.model';
import { ExpressionFunc } from './Expression.model';
import { Widget } from './Widget.model';
import { ExpressionContext } from '../models';
import { enrichEntity, parseAndBind } from '../helpers';

export type ModuleId = Nominal<string, 'ModuleId'>;
export const toModuleId = (source: unknown) => String(source) as ModuleId;

export type Module = BaseModel<ModuleId> & WithBoard & Partial<{

  preload: string;
  load_done: string;
  loader: number;
}>;

type ModuleDTO = Module;

export const Module = {
  toRuntime(context: ExpressionContext, module: Module) {
    return enrichEntity<Module, RuntimeModule>(context.conf, {
      board: 'widgets',
      loader: 'widgets',
      preload: src => parseAndBind(context)(src),
      load_done: src => parseAndBind(context)(src),
    }, module);
  },
  toDTO(source: unknown) {
    return source as ModuleDTO;
  }
}

export type RuntimeModule = Module & Omit<Module, 'preload' | 'load_done' | 'loader'> & {
  preload: ExpressionFunc<void>;
  load_done: ExpressionFunc<boolean>;
  loader: Widget;
  board: Widget;
};