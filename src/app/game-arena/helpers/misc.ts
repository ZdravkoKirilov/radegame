import {
  RuntimeSlotHandler, ExpressionContext, enrichSonata,
} from "@app/game-mechanics";
import { GameBroadcastService } from "../services/game-broadcast/game-broadcast.service";
import { SoundPlayer, GenericEvent, StatefulComponent } from "@app/render-kit";

type HandlerParams = {
  self: StatefulComponent,
  context: ExpressionContext;
  dispatcher: GameBroadcastService,
  handlers: RuntimeSlotHandler[],
}

export const assignHandlers = ({ self, handlers, dispatcher, context }: HandlerParams) => {
  const all_handlers = handlers.reduce(
    (acc, handler) => {
      acc[handler.type] = (event: GenericEvent) => {
        handler.effect(self, event);
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