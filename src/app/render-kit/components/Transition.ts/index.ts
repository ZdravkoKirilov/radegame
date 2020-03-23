import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { DidUpdatePayload, RzStyles, RzElement } from "../../models";
import { RuntimeTransition } from "@app/game-mechanics";
import { TransitionAnimationsPlayer, AnimationPayload } from "../../animations/animation";
import { Dictionary } from "@app/shared";

export type RzTransitionProps = {
  transitions: RuntimeTransition[];
  context: {
    component: StatefulComponent;
    props: Dictionary;
    state: Dictionary
  };
  render: (payload: Dictionary) => RzElement;
};

type State = {
  animatingValue?: Dictionary;
};

export class RzTransition extends StatefulComponent<RzTransitionProps, State> {
  state: State = { animatingValue: {} };
  players: { [id: string]: TransitionAnimationsPlayer } = {};

  createPlayers() {
    this.players = this.props.transitions
      .filter(transition => {
        if (typeof transition.enabled === 'function') {
          return transition.enabled({
            state: this.props.context.state,
            props: this.props.context.props,
            component: this.props.context.component,
          });
        }
        return true;
      })
      .reduce((acc, elem) => {
        const player = new TransitionAnimationsPlayer(elem);
        player.updates$.pipe(
          map(animatingValue => this.setState({
            animatingValue: {
              ...this.state.animatingValue,
              ...animatingValue,
            }
          }))
        ).subscribe();
        acc[elem.id] = player;
        return acc;
      }, {});
  }

  didMount() {
    this.createPlayers();
  }

  willReceiveProps(nextProps: RzTransitionProps) {
    if (nextProps.transitions !== this.props.transitions) {
      this.createPlayers();
    }
  }

  didUpdate(payload: DidUpdatePayload<RzTransitionProps>) {
    const prevContext = payload.prev.props.context;
    const nextContext = payload.next.props.context;

    const reformattedPayload: AnimationPayload = {
      prev: {
        state: prevContext.state,
        props: prevContext.props,
        component: prevContext.component,
      },
      next: {
        state: nextContext.state,
        props: nextContext.props,
        component: nextContext.component,
      }
    };

    Object.values(this.players).forEach(player => {
      if (player.config.trigger(reformattedPayload)) {
        player.play(reformattedPayload);
      }
    });
  }

  willUnmount() {
    Object.values(this.players).forEach(player => player.stop());
  }

  render() {
    const { animatingValue } = this.state;
    return this.props.render(animatingValue);
  }
}