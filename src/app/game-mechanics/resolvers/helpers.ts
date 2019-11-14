import clone from 'immer';
import get from 'lodash/get';

import { GameTemplate, GameConfig } from "../models";
import {
    Setup, Round, Stage, ImageAsset, Slot, HANDLER_TYPES, Expression, GameAction,
    ParamedExpressionFunc, SlotHandler, Handler, Sonata, GameEntity
} from "../entities";
import { ExpressionContext } from "./initializers";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";
import { SoundPlayer } from "@app/render-kit";
import { Dictionary } from '@app/shared';

export const parseFromString = (src: string, context: any): any => {
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

    return total;
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
        (acc, elem) => {
            const handler = conf.handlers[elem.handler as number] as Handler;
            const eventName = event_name_map[handler.type];
            const expression: Expression = conf.expressions[handler.effect as number];
            const innerCallback: ParamedExpressionFunc<Slot> = parseFromString(expression.code, context);
            acc[eventName] = () => {
                const actions: GameAction[] = innerCallback.call(context, payload);
                const enabledRule = handler.enabled;
                playSoundIfNeeded(handler, conf, context);
                if (enabledRule) {
                    const enabledExpression: Expression = conf.expressions[enabledRule as number];
                    const enabledCallback: ParamedExpressionFunc<Slot> = parseFromString(enabledExpression.code, context);
                    if (enabledCallback.call(context, payload)) {
                        dispatcher.dispatch(actions);
                    }
                } else {
                    dispatcher.dispatch(actions);
                }
            };
            return acc;
        },
        {}
    );
    return all_handlers;
};

const playSoundIfNeeded = (handler: Handler, conf: GameConfig, context: ExpressionContext) => {
    const soundExpression = conf.expressions[handler.sound as number] as Expression;
    const getSound = soundExpression ? parseFromString(soundExpression.code, context) : null;
    let sound: Sonata = getSound ? getSound(handler) : null;
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
    [k in keyof T]: string | ((item: any) => any)
};

export const enrichEntity = <T = GameEntity, P extends T = any>(config: Dictionary<GameEntity>, parseConfig: ParseConfig<T>, source: T): P => {
    return clone(source, draft => {
        for (let key in parseConfig) {
            const parser = parseConfig[key];
            const value = draft[key];
            if (typeof value !== 'object' && typeof parser === 'string') {
                draft[key] = get(config, [parser, source[key] as any], null);
            } else if (typeof parser === 'function') {
                if (Array.isArray(value)) {
                    draft[key] = value.map(item => {
                        item = (parser as any)(item);
                    }) as any;
                } else {
                    draft[key] = value && typeof value !== 'object' ? (parser as any)(value as any) as any : value;
                }
            }
        }
    }) as P;
};