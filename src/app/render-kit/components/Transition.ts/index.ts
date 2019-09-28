import { StatefulComponent } from "../../bases";
import { MotionProps, Motion } from "../Motion.ts";
import { DidUpdatePayload } from "../../models";
import { createElement } from "../../helpers";
import { Dictionary, Omit } from "@app/shared";
import { shouldTransition } from "../../animations/helpers";

export type TransitionProps<T = any> = Omit<MotionProps, 'onDone' | 'active'> & {
    trigger: string;
    prop: string;
    context: T;
};

export type State = {
    active: boolean;
};

export class RzTransition extends StatefulComponent<TransitionProps, State> {
    didMount() {
        const { trigger, prop } = this.props;
        if (shouldTransition(trigger, prop, null, true)) {
            this.setState({ active: true });
        }
    }

    didUpdate(payload: DidUpdatePayload<TransitionProps>) {
        const { trigger, prop } = this.props;
        if (shouldTransition(trigger, prop, payload)) {
            this.setState({ active: true });
        }
    }

    willUnmount() {
        const { trigger, prop } = this.props;
        if (shouldTransition(trigger, prop, null, false, true)) {
            this.setState({ active: true });
        }
    }

    onAnimationComplete = () => {
        this.setState({ active: false });
    }

    render() {
        const { initialStyle, targetStyle, config, render } = this.props;
        const { active } = this.state;

        return createElement<MotionProps>(
            Motion, {
            initialStyle, targetStyle, config,
            onDone: this.onAnimationComplete,
            active: active,
            render: (interpolatedStyle: Dictionary<number>) => render(interpolatedStyle),
        });
    }
}