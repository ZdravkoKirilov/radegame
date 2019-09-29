import * as TWEEN from "@tweenjs/tween.js";

import { StatefulComponent } from "../../bases";
import { Dictionary } from "@app/shared";
import { ANIMATION_PLAY_TYPE, Animation, AnimationStep } from "@app/game-mechanics";
import { RenderFunction, DidUpdatePayload } from "../../models";

export type RzAnimationProps = {
    config: Animation;
    active: boolean;
    onDone?: () => void;
};

type State = {
    interpolatingStyle?: Dictionary<number>;
};

export class RzAnimation extends StatefulComponent<RzAnimationProps, State> {
    tweens: Array<TWEEN.Tween> = [];
    group: TWEEN.Group = new TWEEN.Group();
    animationFrame: number;

    state: State = {};

    didMount() {
        if (this.props.active) {
            this.startTweens();
        }
    }

    didUpdate(data: DidUpdatePayload<RzAnimationProps>) {
        if (!data.prev.props.active && data.next.props.active) {
            this.startTweens();
        }
        if (!data.next.props.active) {
            this.stopTweens();
        }
    }

    willUnmount() {
        this.stopTweens();
    }

    startTweens() {
        const { type } = this.props.config;

        if (type === ANIMATION_PLAY_TYPE.SEQUENCE) {
            this.playInSequence();
        } else {
            this.playInParallel();
        }
    }

    playInParallel = () => {
        const { steps } = this.props.config;
        this.group = new TWEEN.Group();

        this.animationFrame = requestAnimationFrame(() => this.group.update());

        this.tweens = steps.map(step => {
            const tween = this.createTween(step);
            tween.start();
            return tween;
        });
    }

    playInSequence = () => {
        const { steps } = this.props.config;
        this.group = new TWEEN.Group();

        this.tweens = steps.reduce(
            (total, step, index) => {
                const prev: TWEEN.Tween = total[index - 1];
                const current = this.createTween(step);
                if (prev) {
                    prev.chain(current);
                }
                total.push(current);
                return total;
            },
            []
        );

        const first = this.tweens[0];

        if (first) {
            this.startRendering();
            first.start();
        }
    }

    startRendering = () => {
        this.animationFrame = requestAnimationFrame(time => {
            this.group.update(time);
            this.startRendering();
        });
    }

    createTween = (data: AnimationStep) => {
        const { from_style, to_style, easing, duration, delay = 0, repeat, bidirectional } = data;

        const tween = new TWEEN.Tween(from_style, this.group)
            .to(to_style, duration)
            .easing(TWEEN.Easing.Linear.None)
            .delay(delay)
            .repeat(repeat >= 0 ? repeat : Infinity)
            .yoyo(bidirectional)
            .onUpdate((interpolatingStyle: Dictionary<number>) => {
                this.setState({ interpolatingStyle })
            });

        return tween;
    }

    stopTweens() {
        this.tweens.forEach(tween => tween.stop());
        this.group.removeAll();
        cancelAnimationFrame(this.animationFrame);
    }

    render() {
        const { active } = this.props;
        const { interpolatingStyle } = this.state;
        const renderFunc = this.props.children[0] as RenderFunction<Dictionary<number>>;
        return renderFunc(active ? interpolatingStyle : {});
    }
};