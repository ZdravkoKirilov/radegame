import { Subject } from "rxjs";
import { TweenMax, TimelineMax, TweenConfig } from 'gsap';

import { Dictionary } from '@app/shared';
import { ANIMATION_PLAY_TYPE, RuntimeAnimation, RuntimeAnimationStep, RuntimeTransition } from "@app/game-mechanics";
import { mapEasing } from "./easings";
import { StatefulComponent } from "../bases";

export type AnimationPayloadSegment<Props = any, State = any> = {
    state: State,
    props: Props,
    component: StatefulComponent<Props, State>,
};

export type AnimationPayload<Props = any, State = any> = {
    prev: AnimationPayloadSegment<Props, State>,
    next: AnimationPayloadSegment<Props, State>,
};

export class TransitionAnimationsPlayer {
    updates$: Subject<Dictionary>;
    done$: Subject<unknown>;

    private player = new AnimationPlayer();

    constructor(public config: RuntimeTransition) {
        this.updates$ = this.player.updates$;
        this.done$ = this.player.done$;
    }

    play = (data: AnimationPayload) => {
        const { animation } = this.config;
        this.player.play(animation, data);
    }

    stop() {
        this.player.stop();
    }
}

export class AnimationPlayer {
    updates$ = new Subject<Dictionary>();
    done$ = new Subject();

    playing = false;
    data: AnimationPayload;

    private timeline: TimelineMax;
    private config: RuntimeAnimation;

    constructor() { }

    play(config: RuntimeAnimation, data: AnimationPayload) {
        this.config = config;
        this.playing = true;
        this.data = data;
        this.startTweens();
    }

    private startTweens() {
        const { type } = this.config;

        if (type === ANIMATION_PLAY_TYPE.SEQUENCE) {
            this.playInSequence();
        } else {
            this.playInParallel();
        }
    }

    private playInParallel = () => {
        const { repeat, bidirectional, delay } = this.config;
        this.timeline = this.createParallelTweens(this.config, this.onUpdate, this.onDone);
        this.timeline.repeat(repeat || 0);
        this.timeline.yoyo(bidirectional || false);
        this.timeline.delay(delay / 1000 || 0);
    }

    private playInSequence = () => {
        const { repeat, bidirectional, delay } = this.config;
        this.timeline = this.createTweenSequence(this.config, this.onUpdate, this.onDone);
        this.timeline.repeat(repeat || 0);
        this.timeline.yoyo(bidirectional || false);
        this.timeline.delay(delay / 1000 || 0);
    }

    onDone = () => {
        this.stop();
        this.playing = false;
        this.done$.next();
    }

    onUpdate = (interpolatingStyle: Dictionary) => {
        this.updates$.next(interpolatingStyle);
    }

    stop() {
        if (this.timeline) {
            this.timeline.kill();
        }
    }

    createParallelTweens = (
        config: RuntimeAnimation,
        onUpdate: (interpolatingStyle: Dictionary<number>) => void,
        onDone: () => void,
    ) => {
        const { steps } = config;
        const timeline = new TimelineMax();

        steps.map(step => {
            const tween = this.createTween(step, onUpdate);
            timeline.add(tween);
            return tween;
        });

        timeline.eventCallback('onComplete', () => {
            onDone();
        });

        return timeline;
    };

    createTweenSequence = (
        config: RuntimeAnimation,
        onUpdate: (interpolatingData: Dictionary) => void,
        onDone: () => void,
    ) => {
        const { steps } = config;
        const timeline = new TimelineMax();

        steps.forEach(step => {
            const {
                from_value, from_style_inline, to_value, to_style_inline,
                duration, delay, bidirectional, repeat, easing, output_transformer
            } = step;

            const start = from_value ? { ...from_value(this.data) } : { ...from_style_inline };
            const end = to_value ? { ...to_value(this.data) } : { ...to_style_inline };

            const tweenConfig: TweenConfig = {
                ...end,
                ease: mapEasing(easing),
                delay: delay > 1 ? delay / 1000 : 0,
                yoyo: bidirectional,
                repeat
            };
            timeline.to(start, duration / 1000, tweenConfig);

            timeline.eventCallback('onUpdate', () => {
                if (output_transformer) {
                    onUpdate(output_transformer(this.data));
                } else {
                    onUpdate(start);
                }
            });
        });

        timeline.eventCallback('onComplete', () => {
            onDone();
        });

        return timeline;
    };

    createTween = (data: RuntimeAnimationStep, onUpdate: (interpolatingStyle: Dictionary) => void) => {
        const { from_value, to_value, from_style_inline, to_style_inline,
            easing, duration, delay = 0, repeat, bidirectional, output_transformer } = data;

        const start = from_value ? { ...from_value(this.data) } : { ...from_style_inline };
        const end = to_value ? { ...to_value(this.data) } : { ...to_style_inline };

        const tweenConfig: TweenConfig = {
            ...end,
            ease: mapEasing(easing),
            delay: delay > 1 ? delay / 1000 : 0,
            yoyo: bidirectional,
            repeat
        };

        const tween = TweenMax.to(start, duration / 1000, tweenConfig);

        tween.eventCallback('onUpdate', () => {
            if (output_transformer) {
                onUpdate(output_transformer(this.data));
            } else {
                onUpdate(start);
            }
        });

        return tween;
    }
}
