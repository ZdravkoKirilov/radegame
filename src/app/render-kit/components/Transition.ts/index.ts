import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { DidUpdatePayload } from "../../models";
import { getChildAsRenderFunc } from "../../helpers";
import { Dictionary } from "@app/shared";
import { withBasicInteractions, BasicInteractionProps } from "../../hocs";
import { Transition, ExpressionContext } from "@app/game-mechanics";
import { TransitionAnimationsPlayer } from "../../animations/animation";
import { isTransitionEnabled } from "app/render-kit/animations/helpers";

export type TransitionProps = Partial<BasicInteractionProps> & {
    transitions: Transition[];
    data: Dictionary;
    context: ExpressionContext;
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
        this.players.forEach(player => {
            if (isTransitionEnabled(player.config, this.props.context, this.props.data)) {
                player.playIfShould(payload, this.props.data)
            }
        });
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