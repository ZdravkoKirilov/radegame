import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { Dictionary } from "@app/shared";
import { Animation } from "@app/game-mechanics";
import { DidUpdatePayload, ComponentData } from "../../models";
import { AnimationPlayer } from "../../animations/animation";
import { getChildAsRenderFunc } from "../../helpers";

export type RzAnimationProps = {
    config: Animation;
    context: ComponentData;
    active: boolean;
};

type State = {
    interpolatingStyle?: Dictionary<number>;
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
            this.player.play(this.props.config, this.props.context);
        }
    }

    didUpdate(data: DidUpdatePayload<RzAnimationProps>) {
        if (!data.prev.props.active && data.next.props.active) {
            this.player.play(this.props.config, data.next);
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
        const renderFunc = getChildAsRenderFunc<Dictionary<number>>(this.props);
        return renderFunc(active ? interpolatingStyle : {});
    }
};