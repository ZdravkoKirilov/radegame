import { StatefulComponent, SoundPlayer } from "@app/render-kit";
import { SonataGetterFunc, Sonata } from "../entities";
import { enrichSonata } from "./entity-composers";
import { ExpressionContext } from "../models";

export const playSoundIfNeeded = (sound: SonataGetterFunc, static_sound: Sonata, self: StatefulComponent, context: ExpressionContext) => {
  const sonata = typeof sound === 'function' ? sound(self) : static_sound;

  if (sonata) {
    const runtimeSonata = enrichSonata(context.conf, sonata);
    const soundPlayer = new SoundPlayer();
    soundPlayer.play(runtimeSonata);
  }
};