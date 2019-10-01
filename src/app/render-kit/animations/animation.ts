import { Subject } from "rxjs";
import * as TWEEN from "@tweenjs/tween.js";

import { Dictionary } from '@app/shared';
import { Animation, AnimationStep, ANIMATION_PLAY_TYPE, Transition, Style, Expression } from "@app/game-mechanics";
import { DidUpdatePayload, ComponentData } from "../models";
import { shouldTransition, parseAnimationValues } from "./helpers";

export class TransitionAnimationsPlayer {
    updates$: Subject<Dictionary>;

    private player = new AnimationPlayer();

    constructor(private config: Transition) {
        this.updates$ = this.player.updates$;
    }

    playIfShould = (data: DidUpdatePayload, injectedProps = {}) => {
        const { trigger, prop, animation } = this.config;
        const enabled = this.config.enabled as Expression;
        const additionalChecker = enabled.parsed_code || function () { return true };
   
        const next: ComponentData = {
            ...data.next,
            props: {
                ...data.next.props,
                ...injectedProps
            }
        };

        if (shouldTransition(trigger, prop, data) && !this.player.playing && additionalChecker()) {
            this.player.play(animation as Animation, next);
        }
    }

    stop() {
        this.player.stop();
    }
}

export class AnimationPlayer {
    updates$ = new Subject<Dictionary>();
    done$ = new Subject();

    playing = false;

    private animationFrame: number;
    private tweens: Array<TWEEN.Tween> = [];
    private group: TWEEN.Group = new TWEEN.Group();
    private config: Animation;
    private context: ComponentData;

    constructor() { }

    play(config: Animation, context: ComponentData) {
        this.config = parseAnimationValues(config, context);
        this.context = context;
        this.playing = true;
        this.startRendering();
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
        const [start, tweens, group] = createParallelTweens(this.config, this.onUpdate, this.onDone);
        this.tweens = tweens;
        this.group = group;
        start();
    }

    private playInSequence = () => {
        const [start, tweens, group] = createTweenSequence(this.config, this.onUpdate, this.onDone);
        this.tweens = tweens;
        this.group = group;
        start();
    }

    private startRendering = () => {
        this.animationFrame = requestAnimationFrame(time => {
            this.group.update(time);
            this.startRendering();
        });
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
        this.tweens.forEach(tween => tween.stop());
        cancelAnimationFrame(this.animationFrame);
        this.group.removeAll();
    }
}

export const createTween = (data: AnimationStep, group: TWEEN.Group) => {
    const { from_style, to_style, easing, duration, delay = 0, repeat, bidirectional } = data;
    const tween = new TWEEN.Tween({ ...from_style as Style }, group)
        .to({ ...to_style as Style }, duration)
        .easing(TWEEN.Easing.Linear.None)
        .delay(delay)
        .repeat(repeat >= 0 ? repeat : Infinity)
        .yoyo(bidirectional);

    return tween;
};

export const createTweenSequence = (
    config: Animation,
    onUpdate: (interpolatingStyle: Dictionary<number>) => void,
    onDone: () => void,
) => {
    const { steps } = config;
    const group = new TWEEN.Group();

    const tweens = steps.reduce(
        (total, step, index) => {
            const prev: TWEEN.Tween = total[index - 1];
            const current = createTween(step, group);
            current.onUpdate(onUpdate);
            if (prev) {
                prev.chain(current);
            }
            total.push(current);
            return total;
        },
        []
    );
    const first = tweens[0] as TWEEN.Tween;
    const last = tweens[tweens.length - 1] as TWEEN.Tween;
    last.onComplete(onDone);

    return [() => first.start(), tweens, group] as [Function, TWEEN.Tween[], TWEEN.Group];
};

export const createParallelTweens = (
    config: Animation,
    onUpdate: (interpolatingStyle: Dictionary<number>) => void,
    onDone: () => void,
) => {
    const { steps } = config;
    const group = new TWEEN.Group();
    const completed = [];

    const tweens = steps.map(step => {
        const tween = createTween(step, group);
        tween.onUpdate(onUpdate);

        tween.onComplete(() => {
            completed.push(tween);
            if (completed.length === steps.length) {
                onDone();
            }
        });
        return tween;
    });

    return [
        () => tweens.forEach(tween => tween.start()),
        tweens,
        group
    ] as [Function, TWEEN.Tween[], TWEEN.Group];
};