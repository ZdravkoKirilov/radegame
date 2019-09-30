import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { DidUpdatePayload } from "../../models";
import { getChildAsRenderFunc } from "../../helpers";
import { Dictionary } from "@app/shared";
import { withBasicInteractions, BasicInteractionProps } from "../../hocs";
import { Transition } from "@app/game-mechanics";
import { TransitionAnimationsPlayer } from "../../animations/animation";

export type TransitionProps = Partial<BasicInteractionProps> & {
    transitions: Transition[];
    context: Dictionary;
};

type State = {
    interpolatingStyle?: Dictionary<number>;
};

class RzTransitionDefinition extends StatefulComponent<TransitionProps, State> {
    state: State = { interpolatingStyle: {} };
    players: TransitionAnimationsPlayer[];

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
        this.players.forEach(player => player.playIfShould(payload, this.props.context));
    }

    willUnmount() {
        this.players.forEach(player => player.stop());
    }

    render() {
        const { interpolatingStyle } = this.state;
        const renderFunc = getChildAsRenderFunc<Dictionary<number>>(this.props);
        return renderFunc(interpolatingStyle || {});
    }
}

export const RzTransition = withBasicInteractions<TransitionProps>(RzTransitionDefinition);