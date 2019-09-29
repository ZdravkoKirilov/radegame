import { StatefulComponent } from "../../bases";
import { RzAnimationProps, RzAnimation } from "../Animation";
import { DidUpdatePayload } from "../../models";
import { createElement } from "../../helpers";
import { Dictionary, Omit } from "@app/shared";
import { shouldTransition } from "../../animations/helpers";
import { withBasicInteractions, BasicInteractionProps } from "../../hocs";
import { AnimationEasing } from "@app/game-mechanics";

export type TransitionConfig = {
    trigger: string;
    prop: string;
    initialStyle: Dictionary<number>;
    targetStyle: Dictionary<number>;
    config: {
        easing: AnimationEasing;
        duration: number;
    },
}

export type TransitionProps = BasicInteractionProps & {
    transitions: TransitionConfig[];
};

export type State = {
    active: boolean;
};

class TransitionComponent extends StatefulComponent<TransitionProps, State> {
    // didMount() {
    //     const { trigger, prop } = this.props;
    //     if (shouldTransition(trigger, prop, null, true)) {
    //         this.setState({ active: true });
    //     }
    // }

    // didUpdate(payload: DidUpdatePayload<TransitionProps>) {
    //     const { trigger, prop } = this.props;
    //     if (shouldTransition(trigger, prop, payload)) {
    //         this.setState({ active: true });
    //     }
    // }

    // willUnmount() {
    //     const { trigger, prop } = this.props;
    //     if (shouldTransition(trigger, prop, null, false, true)) {
    //         this.setState({ active: true });
    //     }
    // }

    // onAnimationComplete = () => {
    //     this.setState({ active: false });
    // }

    // render() {
    //     const { initialStyle, targetStyle, config, render } = this.props;
    //     const { active } = this.state;

    //     return createElement<MotionProps>(
    //         Motion, {
    //         initialStyle, targetStyle, config,
    //         onDone: this.onAnimationComplete,
    //         active: active,
    //         render: (interpolatedStyle: Dictionary<number>) => render(interpolatedStyle),
    //     });
    // }
}

export const RzTransition = withBasicInteractions<TransitionProps>(TransitionComponent);