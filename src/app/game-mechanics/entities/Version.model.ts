import { Nominal } from 'simplytyped';

import { Omit } from '@app/shared';

import { enrichEntity } from "../helpers";
import { Module, ModuleId } from "./Module.model";
import { ExpressionContext, GameId } from "../models";

export type VersionId = Nominal<string, 'VersionId'>;

export type Version = {
  id: VersionId;
  game: GameId;

  name: string;
  description: string;

  date_created: string;
  date_modified: string;

  menu: ModuleId;
};

export type RuntimeVersion = Omit<Version, 'menu'> & {
  menu: Module;
};

export const Version = {
  toRuntime(context: ExpressionContext, version: Version) {
    const config = context.conf;
    return enrichEntity<Version, RuntimeVersion>(config, {
      menu: 'modules'
    }, version);
  }
};

