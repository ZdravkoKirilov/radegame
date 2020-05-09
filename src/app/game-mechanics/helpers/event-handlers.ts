import { Action } from "@ngrx/store";

import { RuntimeNodeHandler, ExpressionContext, playSoundIfNeeded } from "@app/game-mechanics";
import { GenericEvent, StatefulComponent } from "@app/render-kit";

type HandlerParams = {
  self: StatefulComponent,
  context: ExpressionContext;
  dispatch: (payload: Action) => void,
  handlers: RuntimeNodeHandler[],
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
        playSoundIfNeeded(handler.sound, handler.static_sound, self, context);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};