import { GenericEvent, StatefulComponent } from "@app/render-kit";

import { ExpressionContext } from "../models";
import { RuntimeNodeHandler } from "../entities";

type HandlerParams = {
  self: StatefulComponent,
  context: ExpressionContext;
  handlers: RuntimeNodeHandler[],
}

export const assignHandlers = ({ self, handlers }: HandlerParams) => {
  const all_handlers = handlers.reduce(
    (acc: any, handler) => {
      acc[handler.type] = (event: GenericEvent) => {
        handler.effect(self, event);
      };
      return acc;
    },
    {}
  );
  return all_handlers;
};