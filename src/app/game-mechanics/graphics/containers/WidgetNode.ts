import { createElement, RzElementPrimitiveProps, StatefulComponent } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import {
    selectNodeHandlers, CommonGameStore, selectExpressionContext, selectNodeLifecycles, selectNodeStyleSync, selectChildPropsSync, assignHandlers
} from "../../helpers";
import { RootWidgetProps, RootWidget } from "./RootWidget";

export type EnhancedWidgetNodeProps = {
    data: RuntimeWidgetNode;
    fromParent: any;
}

type StoreProps = {
    context: ExpressionContext;
    handlers: RuntimeNodeHandler[];
    lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedWidgetNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@GiveAndUseContext
@WithNodeLifecycles
class EnhancedWidgetNode extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, handlers, context } = this.props;
        const { animated } = this.state;
        const childProps = selectChildPropsSync(data, self);
        const style = selectNodeStyleSync(data, self);
        const styleWithTransitionOverrides = { ...style, ...animated };

        return createElement<RzElementPrimitiveProps>(
            'container',
            {
                ...assignHandlers({ self, handlers, context }),
                styles: { z: style.z },
                name: `WidgetNode_${data.name}`,
            },
           /*  createElement<RzTransitionProps>(
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
            ), */
            createElement<RootWidgetProps>(
                RootWidget,
                {
                    widget: data.board,
                    fromParent: childProps,
                    style: styleWithTransitionOverrides,
                }
            )
        );
    }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedWidgetNodeProps): StoreProps => ({
    context: selectExpressionContext(state),
    handlers: selectNodeHandlers(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetNode);