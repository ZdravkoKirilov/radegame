import { Tween, Easing, Group } from "@tweenjs/tween.js";

import { StatefulComponent } from "../../bases";
import { Dictionary } from "@app/shared";
import { AnimationEasing } from "@app/game-mechanics";
import { RenderFunction, DidUpdatePayload } from "../../models";

export type MotionProps = {
    initialStyle: Dictionary<number>;
    targetStyle: Dictionary<number>;
    active: boolean;
    config: {
        easing: AnimationEasing;
        duration: number;
    },
    render: RenderFunction<Dictionary<number>>;
    onDone: () => void;
};

type State = {
    interpolatingStyle: Dictionary<number>;
};

export class Motion extends StatefulComponent<MotionProps, State> {
    tween: Tween;
    group: Group;

    animationFrame: number;

    didMount() {
        if (this.props.active) {
            this.startTweens();
        }
    }

    didUpdate(data: DidUpdatePayload<MotionProps>) {
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
        const { initialStyle, targetStyle, onDone } = this.props;
        const { easing, duration } = this.props.config;
        this.group = new Group();

        this.tween = new Tween(initialStyle, this.group)
            .to(targetStyle, duration)
            .easing(Easing.Linear.None)
            .delay(duration)
            .onUpdate((interpolatingStyle: Dictionary<number>) => {
                this.setState({ interpolatingStyle })
            })
            .onStop(() => {

            })
            .onComplete(() => {
                onDone();
            });

        // tween.repeat(repeat);
        // tween.yoyo(yoyo);

        this.animationFrame = requestAnimationFrame(() => this.group.update());
        this.tween.start();
    }

    stopTweens() {
        this.tween.stop();
        this.group.removeAll();
        cancelAnimationFrame(this.animationFrame);
    }

    render() {
        const { active } = this.props;
        const { interpolatingStyle } = this.state;

        return this.props.render(active ? interpolatingStyle : {});
    }
};