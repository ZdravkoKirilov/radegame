import { Subject } from "rxjs";
import { TweenMax, TimelineMax, TweenConfig } from 'gsap';

import { Dictionary } from '@app/shared';
import { Animation, AnimationStep, ANIMATION_PLAY_TYPE, Transition, Style } from "@app/game-mechanics";
import { DidUpdatePayload, ComponentData } from "../models";
import { shouldTransition, parseAnimationValues, AnimatableProps } from "./helpers";
import { mapEasing } from "./easings";

export class TransitionAnimationsPlayer {
    updates$: Subject<Dictionary>;

    private player = new AnimationPlayer();

    constructor(public config: Transition) {
        this.updates$ = this.player.updates$;
    }

    playIfShould = (data: DidUpdatePayload, injectedProps = {}) => {
        const { trigger, prop, animation } = this.config;

        const next: ComponentData = {
            ...data.next,
            props: {
                ...data.next.props,
                ...injectedProps
            }
        };

        if (shouldTransition(trigger, prop, data) && !this.player.playing) {
            this.player.play(animation as Animation, next);
        }
    }

    stop() {
        this.player.stop();
    }
}

export class AnimationPlayer {
    updates$ = new Subject<AnimatableProps>();
    done$ = new Subject();

    playing = false;

    private timeline: TimelineMax;
    private config: Animation;

    constructor() { }

    play(config: Animation, context: ComponentData) {
        this.config = parseAnimationValues(config, context);
        this.playing = true;
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
        this.timeline = createParallelTweens(this.config, this.onUpdate, this.onDone);
        this.timeline.repeat(repeat || 0);
        this.timeline.yoyo(bidirectional || false);
        this.timeline.delay(delay / 1000 || 0);
    }

    private playInSequence = () => {
        const { repeat, bidirectional, delay } = this.config;
        this.timeline = createTweenSequence(this.config, this.onUpdate, this.onDone);
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
}

export const createTween = (data: AnimationStep, onUpdate: (interpolatingStyle: AnimatableProps) => void) => {
    const { from_style, to_style, easing, duration, delay = 0, repeat, bidirectional } = data;
    const fromStyle = { ...(from_style as Style) };
    const toStyle: TweenConfig = {
        ...(to_style as Style),
        ease: mapEasing(easing),
        delay: delay > 1 ? delay / 1000 : 0,
        yoyo: bidirectional,
        repeat
    };

    const tween = TweenMax.to(fromStyle, duration / 1000, toStyle);

    tween.eventCallback('onUpdate', () => {
        onUpdate(fromStyle);
    });

    return tween;
};

export const createTweenSequence = (
    config: Animation,
    onUpdate: (interpolatingStyle: AnimatableProps) => void,
    onDone: () => void,
) => {
    const { steps } = config;
    const timeline = new TimelineMax();

    steps.forEach(step => {
        const { from_style, to_style, duration, delay, bidirectional, repeat, easing } = step;
        const fromStyle = { ...(from_style as Style) };
        const toStyle: TweenConfig = {
            ...(to_style as Style),
            ease: mapEasing(easing),
            delay: delay > 1 ? delay / 1000 : 0,
            yoyo: bidirectional,
            repeat
        };
        timeline.to(fromStyle, duration / 1000, toStyle);

        timeline.eventCallback('onUpdate', () => {
            onUpdate(fromStyle);
        });
    });

    timeline.eventCallback('onComplete', () => {
        onDone();
    });

    return timeline;
};

export const createParallelTweens = (
    config: Animation,
    onUpdate: (interpolatingStyle: Dictionary<number>) => void,
    onDone: () => void,
) => {
    const { steps } = config;
    const timeline = new TimelineMax();

    steps.map(step => {
        const tween = createTween(step, onUpdate);
        timeline.add(tween);
        return tween;
    });

    timeline.eventCallback('onComplete', () => {
        onDone();
    });

    return timeline;
};