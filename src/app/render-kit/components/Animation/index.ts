import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { RuntimeAnimation } from "@app/game-mechanics";
import { DidUpdatePayload } from "../../models";
import { AnimationPlayer } from "../../animations/animation";
import { getChildAsRenderFunc } from "../../helpers";
import { AnimatableProps } from "../../animations";

export type RzAnimationProps = {
    config: RuntimeAnimation;
    active: boolean;
};

type State = {
    interpolatingStyle?: AnimatableProps;
};

export class RzAnimation extends StatefulComponent<RzAnimationProps, State> {
    private player: AnimationPlayer;

    state: State = {};

    didMount() {
        this.player = new AnimationPlayer();
        this.player.updates$.pipe(
            map(interpolatingStyle => {
                this.setState({
                    interpolatingStyle: {
                        ...this.state.interpolatingStyle,
                        ...interpolatingStyle
                    }
                });
            })
        ).subscribe();

        if (this.props.active && this.props.config) {
            this.player.play(this.props.config);
        }
    }

    didUpdate(data: DidUpdatePayload<RzAnimationProps>) {
        if (!data.prev.props.active && data.next.props.active) {
            this.player.play(this.props.config);
        }
        if (!data.next.props.active) {
            this.player.stop();
        }
    }

    willUnmount() {
        this.player.stop();
    }

    render() {
        const { active } = this.props;
        const { interpolatingStyle } = this.state;
        const renderFunc = getChildAsRenderFunc<AnimatableProps>(this.props);
        return renderFunc(active ? interpolatingStyle : {});
    }
};