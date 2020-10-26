import { GenericEvent, StatefulComponent } from "@app/render-kit";

import { ExpressionContext } from "../models";
import { RuntimeNodeHandler } from "../entities";
import { playSoundIfNeeded } from "./sounds";

type HandlerParams = {
  self: StatefulComponent,
  context: ExpressionContext;
  handlers: RuntimeNodeHandler[],
}

export const assignHandlers = ({ self, handlers, context }: HandlerParams) => {
  const all_handlers = handlers.reduce(
    (acc, handler) => {
      acc[handler.type] = (event: GenericEvent) => {
        handler.effect(self, event);
        playSoundIfNeeded(handler.dynamic_sound, handler.sound, self, context);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};