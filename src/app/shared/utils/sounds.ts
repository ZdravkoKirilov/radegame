import { SonataGetterFunc, Sonata, ExpressionContext, enrichSonata } from "@app/game-mechanics";
import { StatefulComponent, SoundPlayer } from "@app/render-kit";

export const playSoundIfNeeded = (sound: SonataGetterFunc, static_sound: Sonata, self: StatefulComponent, context: ExpressionContext) => {
  const sonata = typeof sound === 'function' ? sound(self) : static_sound;

  if (sonata) {
    const runtimeSonata = enrichSonata(context.conf, sonata);
    const soundPlayer = new SoundPlayer();
    soundPlayer.play(runtimeSonata);
  }
};