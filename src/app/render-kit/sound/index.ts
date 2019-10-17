import { Subject } from "rxjs";
import { Howl } from 'howler';

export class SoundPlayer {
    done$: Subject<unknown>;
    playing = false;

    private howl: Howl;

    play() {

    }

    stop() {

    }
}

new Howl({
    src: []
})