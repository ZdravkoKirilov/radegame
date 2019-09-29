import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";

import { createElement, Memo, RzAnimation, RzTransition } from "@app/render-kit";
import StaticNode, { Props as StaticNodeProps } from './static-node';
import { withStore } from "../../../hocs";
import { AppState } from "@app/core";
import { Animation, Slot, Transition } from "../../../entities";
import { selectSlotAnimation, selectSlotTransitions } from "@app/game-arena";
import { Dictionary } from "@ngrx/entity";

type HOCProps = {
    store: Store<AppState>;
}

export type Props = Partial<HOCProps> & {
    data: Slot;
};

export const Node = Memo<Props>(
    (props, { useEffect, useState }) => {
        const { data, store } = props;
        const [animation, setAnimation] = useState<Animation>(null);
        const [transitions, setTransitions] = useState<Transition[]>(null);

        useEffect(() => {
            const subs = [
                store.pipe(select(selectSlotAnimation(data.id)), map(animation => setAnimation(animation))).subscribe(),
                store.pipe(select(selectSlotTransitions(data.id)), map(transitions => setTransitions(transitions))).subscribe(),
            ];
            return () => subs.forEach(sub => sub.unsubscribe());
        }, []);

        return transitions ? createElement(
            RzTransition,
            { transitions },
            (interpolatedStyle: Dictionary<number>) => {
                return createElement(
                    'container',
                    {
                        styles: { x: data.x, y: data.y },
                        id: data.id,
                        name: `node_${data.id}`
                    },
                    createElement<StaticNodeProps>(StaticNode, { data, interpolatedStyle })
                );
            }
        ) : null;

        // return createElement(
        //     RzAnimation,
        //     {
        //         config: animation,
        //         active: !!animation,
        //     },
        //     (interpolatedStyle: Dictionary<number>) => {
        //         return createElement(
        //             'container',
        //             {
        //                 styles: { x: data.x, y: data.y },
        //                 id: data.id,
        //                 name: `node_${data.id}`
        //             },
        //             createElement<StaticNodeProps>(StaticNode, { data, interpolatedStyle })
        //         );
        //     }
        // );
    },
    ['data'],
);

export default withStore(Node);