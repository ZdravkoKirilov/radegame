import { Action } from "@ngrx/store";

import {
  RuntimeSlotHandler, ExpressionContext, enrichSonata,
} from "@app/game-mechanics";
import { SoundPlayer, GenericEvent, StatefulComponent } from "@app/render-kit";

type HandlerParams = {
  self: StatefulComponent,
  context: ExpressionContext;
  dispatch: (payload: Action) => void,
  handlers: RuntimeSlotHandler[],
}

export const assignHandlers = ({ self, handlers, context, dispatch }: HandlerParams) => {
  const all_handlers = handlers.reduce(
    (acc, handler) => {
      acc[handler.type] = (event: GenericEvent) => {
        const actionOrActions = handler.effect(self, event);
        if (actionOrActions) {
          if (Array.isArray(actionOrActions)) {
            actionOrActions.forEach(action => dispatch(action));
          } else {
            dispatch(actionOrActions);
          }
        }
        playSoundIfNeeded(handler, self, context);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};

const playSoundIfNeeded = (handler: RuntimeSlotHandler, self: StatefulComponent, context: ExpressionContext) => {
  const sonata = typeof handler.sound === 'function' ? handler.sound(self) : handler.static_sound;

  if (sonata) {
    const runtimeSonata = enrichSonata(context.conf, sonata);
    const soundPlayer = new SoundPlayer();
    soundPlayer.play(runtimeSonata);
  }
};