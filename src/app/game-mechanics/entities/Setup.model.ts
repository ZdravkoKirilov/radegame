import { Nominal } from 'simplytyped';

import { Omit } from '@app/shared';

import { BaseModel } from "./Base.model";
import { ExpressionContext } from "../models";
import { ExpressionFunc } from "./Expression.model";
import { enrichEntity, parseAndBind } from "../helpers";

export type SetupId = Nominal<string, 'SetupId'>;
export const toSetupId = (source: unknown) => String(source) as SetupId;

export type Setup = BaseModel<SetupId> & {
  min_players: number;
  max_players: number;
  recommended_age: number;

  get_active_module: string;
  get_active_language: string;
};

type SetupDTO = Setup;

export const Setup = {
  toRuntime(context: ExpressionContext, setup: Setup) {
    if (setup) {
      return enrichEntity<Setup, RuntimeSetup>(context.conf, {
        get_active_language: src => parseAndBind(context)(src),
        get_active_module: src => parseAndBind(context)(src),
      }, setup);
    }
    return null;
  },
  toDTO(source: unknown) {
    return source as SetupDTO;
  }
};

export type RuntimeSetup = Omit<Setup, 'get_active_language' | 'get_active_module'> & {
  get_active_module: ExpressionFunc<string>;
  get_active_language: ExpressionFunc<string>;
};

