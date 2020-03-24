import { map } from "rxjs/operators";

import { StatefulComponent } from "../../bases";
import { DidUpdatePayload, RzElement } from "../../models";
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
  onUpdate: (payload: Dictionary) => void;
  onDone?: () => void;
};

export class RzTransition extends StatefulComponent<RzTransitionProps> {
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
          map(animatingValue => this.props.onUpdate(animatingValue))
        ).subscribe();

        if (this.props.onDone) {
          player.done$.pipe(
            map(() => this.props.onDone())
          ).subscribe();
        }

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
    if (Object.values(this.players).every(player => !player.isActive)) {
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
  }

  willUnmount() {
    Object.values(this.players).forEach(player => player.stop());
  }

  render() {
    return this.props.children;
  }
}