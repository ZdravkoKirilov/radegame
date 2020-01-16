import clone from 'immer';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

import { GameTemplate, GameConfig } from "../models";
import {
  HANDLER_TYPES, GameAction, GameEntity, RuntimeSlotHandler, RuntimeSlot
} from "../entities";
import { ExpressionContext } from "./initializers";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";
import { SoundPlayer, GenericEvent, BasicComponent } from "@app/render-kit";
import { Dictionary } from '@app/shared';

export const parseFromString = <T = any>(context: Dictionary) => (src: string): T => {
  try {
    const result = (new Function("with(this) {" + src + "}")).call(context);
    return result !== undefined ? result : '';
  } catch (err) {
    return '' as any;
  }
};

export const parseAndBind = <T = Function>(context: Dictionary) => (src: string): T => {
  const func = parseFromString(context)(src) as Function;
  return typeof func === 'function' ? func.bind(context) : func;
};

type HandlerParams<T> = {
  payload: T,
  conf: GameTemplate,
  dispatcher: GameBroadcastService,
  handlers: RuntimeSlotHandler[],
  context: ExpressionContext,
}

export const assignHandlers = <T = any>({ payload, conf, dispatcher, handlers, context }: HandlerParams<T>) => {
  const all_handlers = handlers.reduce(
    (acc, handler) => {
      const eventName = event_name_map[handler.type];
      const innerCallback = handler.effect;
      acc[eventName] = (event: GenericEvent, component: BasicComponent) => {
        const actions: GameAction[] = innerCallback(payload, event, component);
        playSoundIfNeeded(handler, conf, payload as any);
        dispatcher.dispatch(actions);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};

const playSoundIfNeeded = (handler: RuntimeSlotHandler, conf: GameConfig, payload: RuntimeSlot) => {
  if (typeof handler.sound === 'function') {
    const sound = handler.sound(payload);
    if (sound) {
      sound.steps = sound.steps.map(step => {
        step = { ...step };
        step.sound = conf.sounds[step.sound as number];
        return step;
      });
      const soundPlayer = new SoundPlayer();
      soundPlayer.play(sound);
    }
  }
};

const event_name_map = {
  [HANDLER_TYPES.POINTERDOWN]: 'onPointerdown',
  [HANDLER_TYPES.POINTERUP]: 'onPointerup',
  [HANDLER_TYPES.HOVERIN]: 'onPointerover',
  [HANDLER_TYPES.HOVEROUT]: 'onPointerout'
} as const;

type ParseConfig<T> = Partial<{
  [K in keyof T]: string | ((item: any) => any);
}>;

export const enrichEntity = <T = GameEntity, P = any>(
  config: Dictionary<GameEntity>,
  parseConfig: ParseConfig<T>,
  source: T,
): P => {
  return source ? clone<P>(source as any, (draft: any) => {
    for (let key in parseConfig) {
      const parser = parseConfig[key] as any;
      const currentPropertyValue = draft[key];

      if (isArray(currentPropertyValue) || typeof currentPropertyValue !== 'object') {
        if (typeof parser === 'string') {
          draft[key] = get(config, [parser, source[key] as any], null);
        }
        if (typeof parser === 'function') {
          if (isArray(currentPropertyValue)) {
            draft[key] = currentPropertyValue.map(elem => {
              return parser(elem);
            }) as any;
          } else {
            draft[key] = parser(currentPropertyValue);
          }
        }
      }
    }
  }) : null;
};