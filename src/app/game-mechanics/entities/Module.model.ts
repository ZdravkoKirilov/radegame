import { Omit, Nominal } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from '@app/shared';

import { GameEntityParser } from './Base.model';
import { toWidgetId, Widget, WidgetId } from './Widget.model';
import { enrichEntity } from '../helpers';
import { toVersionId, VersionId } from './Version.model';

export type ModuleId = Nominal<string, 'ModuleId'>;
export const toModuleId = (source: unknown) => String(source) as ModuleId;

export type Module = Tagged<'Module', {
  id: ModuleId;
  name: string;
  description: string;
  version: VersionId;

  entry: WidgetId;
  loader: WidgetId;
  dependencies: ModuleId[];
}>;

export type DtoModule = Omit<Module, 'id' | '__tag' | 'entry' | 'loader' | 'version' | 'dependencies'> & {
  id: number;
  version: number;
  entry: number;
  loader: number;
  dependencies: number[];
};

export type RuntimeModule = Module & Omit<Module, 'loader' | 'entry' | 'dependencies'> & {
  loader: Widget;
  entry: Widget;
};

export const Module: GameEntityParser<Module, DtoModule, RuntimeModule> = {

  toRuntime(context, module) {
    return enrichEntity<Module, RuntimeModule>(context.conf, {
      entry: 'widgets',
      loader: 'widgets',
    }, module);
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      version: Number(entity.version),
      loader: Number(entity.loader),
      entry: Number(entity.entry),
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
      entry: toWidgetId(dto.entry),
      dependencies: dto.dependencies.map(moduleId => toModuleId(moduleId))
    };
  }
}