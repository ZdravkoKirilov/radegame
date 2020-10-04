import { Omit, Nominal } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from '@app/shared';

import { GameEntityParser, WithBoard } from './Base.model';
import { toWidgetId, Widget, WidgetId } from './Widget.model';
import { enrichEntity } from '../helpers';
import { toVersionId, VersionId } from './Version.model';

export type ModuleId = Nominal<string, 'ModuleId'>;
export const toModuleId = (source: unknown) => String(source) as ModuleId;

export type Module = Tagged<'Module', WithBoard & {
  id: ModuleId;
  name: string;
  description: string;
  version: VersionId;
  loader: WidgetId;
  dependencies: ModuleId[];
}>;

type DtoModule = Omit<Module, 'id' | '__tag' | 'board' | 'loader' | 'version' | 'dependencies'> & {
  id: number;
  version: number;
  board: number;
  loader: number;
  dependencies: number[];
};

export type RuntimeModule = Module & Omit<Module, 'loader' | 'board' | 'dependencies'> & {
  loader: Widget;
  board: Widget;
};

export const Module: GameEntityParser<Module, DtoModule, RuntimeModule> = {

  toRuntime(context, module) {
    return enrichEntity<Module, RuntimeModule>(context.conf, {
      board: 'widgets',
      loader: 'widgets',
    }, module);
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      version: Number(entity.version),
      loader: Number(entity.loader),
      board: Number(entity.board),
      dependencies: entity.dependencies.map(moduleId => Number(moduleId)),
    };
  },

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Module',
      id: toModuleId(dto.id),
      version: toVersionId(dto.version),
      loader: toWidgetId(dto.loader),
      board: toWidgetId(dto.board),
      dependencies: dto.dependencies.map(moduleId => toModuleId(moduleId))
    };
  }
}