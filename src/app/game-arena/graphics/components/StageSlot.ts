import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeSlot, connectToStore, StageRendererProps, StageRenderer, RuntimeStage,
    RuntimeSlotHandler, ExpressionContext, selectSlotStyleSync, RuntimeTransition, selectStageFrameSync, selectStageSlotsSync
} from "@app/game-mechanics";
import {
    selectRuntimeStage, selectSlotHandlers, selectExpressionContext,
    selectSlotTransitions
} from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticStage, { StaticStageProps } from "./StaticStage";
import { assignHandlers } from "../../helpers";
import { Dictionary } from "@app/shared";

export type EnhancedStageSlotProps = {
    data: RuntimeSlot;
}

type StoreProps = {
    stage: RuntimeStage;
    handlers: RuntimeSlotHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
};

type Props = EnhancedStageSlotProps & StoreProps;

type State = { animated: Dictionary };

class EnhancedStageSlot extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, stage, handlers, context, transitions } = this.props;
        const { animated } = this.state;
        const style = selectSlotStyleSync(data, self);
        const frame = selectStageFrameSync(stage, context, self);
        const slots = selectStageSlotsSync(stage, context, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({
                    self,
                    dispatcher: null,
                    handlers,
                    context
                }),
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
                            createElement<NodeFactoryProps>(NodeFactory, { data: slot })
                        );
                    },
                    renderStaticStage: stage => createElement<StaticStageProps>(StaticStage, { stage, style }),
                }),
            )
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedStageSlotProps): StoreProps => ({
    stage: selectRuntimeStage(ownProps.data.board)(state),
    handlers: selectSlotHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectSlotTransitions(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedStageSlot);