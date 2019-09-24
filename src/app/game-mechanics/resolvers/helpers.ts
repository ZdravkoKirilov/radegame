import { GameTemplate } from "../models";
import {
    Setup, Round, Stage, ImageAsset, Slot, HANDLER_TYPES, Expression, GameAction,
    ParamedExpressionFunc, SlotHandler, Handler
} from "../entities";
import { ExpressionContext } from "./initializers";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";

export const evaluate = (src: string, context: any): any => {
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
        const stage = conf.stages[round_data.board] as Stage;
        const image = conf.images[stage.image] as ImageAsset;
        const slot_images = Object.values(conf.slots).reduce(
            (acc, item: Slot) => {
                if (item.owner === stage.id) {
                    const slot_image: ImageAsset = conf.images[item.image];
                    acc.push(slot_image.image);
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
            const handler: Handler = conf.handlers[elem.handler];
            const eventName = event_name_map[handler.type];
            const expression: Expression = conf.expressions[handler.effect];
            const innerCallback: ParamedExpressionFunc<Slot> = evaluate(expression.code, context);
            acc[eventName] = () => {
                const actions: GameAction[] = innerCallback.call(context, payload);
                dispatcher.dispatch(actions);
            };
            return acc;
        },
        {}
    );
    return all_handlers;
};

const event_name_map = {
    [HANDLER_TYPES.POINTERDOWN]: 'onPointerdown',
    [HANDLER_TYPES.POINTERUP]: 'onPointerup',
    [HANDLER_TYPES.HOVERIN]: 'onPointerover',
    [HANDLER_TYPES.HOVEROUT]: 'onPointerout'
} as const;