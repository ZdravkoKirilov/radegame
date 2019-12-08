import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { DidUpdatePayload } from "../../models";
import { getChildAsRenderFunc } from "../../helpers";
import { BasicInteractionProps } from "../../hocs";
import { RuntimeTransition } from "@app/game-mechanics";
import { TransitionAnimationsPlayer } from "../../animations/animation";
import { isTransitionEnabled, AnimatableProps } from "../../animations/helpers";

export type TransitionProps = Partial<BasicInteractionProps> & {
    transitions: RuntimeTransition[];
    [key: string]: any;
};

type State = {
    interpolatingStyle?: AnimatableProps;
};

export class RzTransition extends StatefulComponent<TransitionProps, State> {
    state: State = { interpolatingStyle: {} };
    players: TransitionAnimationsPlayer[] = [];

    didMount() {
        this.players = this.props.transitions.map(elem => {
            const player = new TransitionAnimationsPlayer(elem);
            player.updates$.pipe(
                map(interpolatingStyle => this.setState({
                    interpolatingStyle: {
                        ...this.state.interpolatingStyle,
                        ...interpolatingStyle,
                    }
                }))
            ).subscribe();

            return player;
        });
    }

    didUpdate(payload: DidUpdatePayload<TransitionProps>) {
        this.players.forEach(player => {
            if (isTransitionEnabled(player.config, payload)) {
                player.playIfShould(payload);
            }
        });
    }

    willUnmount() {
        this.players.forEach(player => player.stop());
    }

    render() {
        const { interpolatingStyle } = this.state;
        const renderFunc = getChildAsRenderFunc<AnimatableProps>(this.props);
        return renderFunc(interpolatingStyle || {});
    }
}