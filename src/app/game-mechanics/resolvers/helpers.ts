import clone from 'immer';
import get from 'lodash/get';

import { GameTemplate, GameConfig } from "../models";
import {
  Setup, Round, Stage, ImageAsset, Slot, HANDLER_TYPES, GameAction,
  ParamedExpressionFunc, SlotHandler, Sonata, GameEntity
} from "../entities";
import { ExpressionContext } from "./initializers";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";
import { SoundPlayer } from "@app/render-kit";
import { Dictionary } from '@app/shared';

export const parseFromString = (context: Dictionary) => (src: string): any => {
  try {
    const result = (new Function("with(this) {" + src + "}")).call(context);
    return result !== undefined ? result : '';
  } catch (err) {
    return '';
  }
};

export const getAllImageAssets = (setup_id: number, conf: GameTemplate) => {
  const setup_data = conf.setups[setup_id] as Setup;
  let total = [];
  setup_data.rounds.forEach(elem => {
    const round_data = conf.rounds[elem.round] as Round;
    const stage = conf.stages[round_data.board as number] as Stage;
    const image = conf.images[stage.image as number] as ImageAsset;
    const slot_images = Object.values(conf.slots).reduce(
      (acc, item: Slot) => {
        if (item.owner === stage.id) {
          const slot_image: ImageAsset = conf.images[item.image as number];
          slot_image ? acc.push(slot_image.image) : null;
        }
        return acc;
      },
      []
    );
    total = [...total, image.image, ...slot_images];
  });

  return [] //total;
};

type HandlerParams<T> = {
  payload: T,
  conf: GameTemplate,
  dispatcher: GameBroadcastService,
  handlers: SlotHandler[],
  context: ExpressionContext,
}

export const assignHandlers = <T = any>({ payload, conf, dispatcher, handlers, context }: HandlerParams<T>) => {
  const all_handlers = handlers.reduce(
    (acc, handler) => {
      const eventName = event_name_map[handler.type];
      const innerCallback = parseFromString(context)(handler.effect);
      acc[eventName] = () => {
        const actions: GameAction[] = innerCallback.call(context, payload);
        playSoundIfNeeded(handler, conf, context);
        dispatcher.dispatch(actions);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};

export const inlineOrRelated = <T, P>(
  target: T, prop: keyof T, nestedProp: string,
  entities: GameConfig, slice: keyof GameConfig, callback: Function, merge = false,
) => {
  const inlineProp = `${prop}_inline`;
  const path = [slice, target[prop as string], nestedProp].filter(Boolean);
  const related: P = get(entities, path);
  const inlineString = target[inlineProp];

  try {
    const inlineParsed = callback(inlineString);
    return merge ? { ...related, ...inlineParsed } : inlineParsed;
  } catch {
    return related;
  }
};

const playSoundIfNeeded = (handler: SlotHandler, conf: GameConfig, context: ExpressionContext) => {
  const getSound = parseFromString(context)(handler.sound);
  let sound: Sonata = getSound ? getSound.call(context, handler) : null;
  if (sound) {
    sound = { ...sound };
    sound.steps = sound.steps.map(step => {
      step = { ...step };
      step.sound = conf.sounds[step.sound as number];
      return step;
    });
    const soundPlayer = new SoundPlayer();
    soundPlayer.play(sound);
  }
};

const event_name_map = {
  [HANDLER_TYPES.POINTERDOWN]: 'onPointerdown',
  [HANDLER_TYPES.POINTERUP]: 'onPointerup',
  [HANDLER_TYPES.HOVERIN]: 'onPointerover',
  [HANDLER_TYPES.HOVEROUT]: 'onPointerout'
} as const;

type ParseConfig<T> = {
  [k in keyof T]: string | ((item: any) => any) | { [key: string]: any }
};

export const enrichEntity = <T = GameEntity, P extends T = T>(
  config: Dictionary<GameEntity>,
  parseConfig: ParseConfig<T>,
  source: T,
): P => {
  return source ? clone(source, draft => {
    for (let key in parseConfig) {
      const parser = parseConfig[key];
      const currentPropertyValue = draft[key];

      if (typeof currentPropertyValue !== 'object') {
        if (typeof parser === 'string') {
          draft[key] = get(config, [parser, source[key] as any], null);
        }
        if (typeof parser === 'function') {
          draft[key] = currentPropertyValue && typeof currentPropertyValue !== 'object' ?
            (parser as any)(currentPropertyValue as any) as any :
            currentPropertyValue;
        }
        if (Array.isArray(currentPropertyValue) && typeof parser === 'object') {
          draft[key] = currentPropertyValue.map(item => {
            item = enrichEntity(config, parser as ParseConfig<any>, { ...item });
            return item;
          }) as any;
        }
      }
    }
  }) as P : null;
};