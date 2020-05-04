import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeSlot, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
    RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, RuntimeTransition, selectStageFrameSync, selectStageSlotsSync, AddedStoreProps, GiveAndUseContext, WithSlotLifecycles, RuntimeSlotLifecycle, selectChildPropsSync
} from "@app/game-mechanics";
import {
    selectRuntimeStage, selectSlotHandlers, selectExpressionContext,
    selectSlotTransitions,
    selectSlotLifecycles
} from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";
import { assignHandlers } from "../../helpers";
import { Dictionary } from "@app/shared";

export type EnhancedStageSlotProps = {
    data: RuntimeSlot;
    fromParent: any;
}

type StoreProps = {
    stage: RuntimeStage;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeSlotLifecycle[];
};

type Props = EnhancedStageSlotProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@GiveAndUseContext
@WithSlotLifecycles
class EnhancedStageSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, stage, handlers, context, transitions, dispatch } = this.props;
        const childProps = selectChildPropsSync(data, self);
        const { animated } = this.state;
        const style = selectSlotStyleSync(data, self);
        const frame = selectStageFrameSync(stage, context, self);
        const slots = selectStageSlotsSync(stage, context, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, dispatch, handlers, context }),
                styles: { z_order: style.z_order }
            },
            createElement<RzTransitionProps>(
                RzTransition,
                {
                    transitions,
                    context: {
                        component: self,
                        props: this.props,
                        state: this.state,
                    },
                    onUpdate: (value: Dictionary) => this.setState({ animated: value }),
                    onDone: transition => {
                        if (transition.onDone) {
                            transition.onDone({
                                component: self,
                                transition,
                                styles: styleWithTransitionOverrides,
                            });
                        }
                    }
                },
            ),
            createElement<StageRendererProps>(StageRenderer, {
                stage, slots, style: styleWithTransitionOverrides, frame,
                renderChild: (slot: RuntimeSlot) => {
                    const childSlotStyle = selectSlotStyleSync(slot, {} as StatefulComponent);

                    return createElement<RzElementPrimitiveProps>(
                        'container',
                        {
                            styles: { x: slot.x, y: slot.y, z_order: childSlotStyle.z_order },
                            id: slot.id,
                            name: `node_${slot.id}`
                        },
                        createElement<NodeFactoryProps>(NodeFactory, { data: slot, fromParent: childProps })
                    );
                },
                renderFrame: stage => createElement<StaticStageProps>(StaticStage, { stage, style, fromParent: childProps }),
            }),
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedStageSlotProps): StoreProps => ({
    stage: selectRuntimeStage(ownProps.data.board)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
    lifecycles: selectSlotLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedStageSlot);