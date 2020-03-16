import {
  GameTemplate, GameConfig, HANDLER_TYPES, GameAction,
  RuntimeSlotHandler, RuntimeSlot, ExpressionContext,
} from "@app/game-mechanics";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";
import { SoundPlayer, GenericEvent, BasicComponent, RzEventTypes } from "@app/render-kit";

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
  [HANDLER_TYPES.POINTERDOWN]: RzEventTypes.onPointerDown,
  [HANDLER_TYPES.POINTERUP]: RzEventTypes.onPointerUp,
} as const;