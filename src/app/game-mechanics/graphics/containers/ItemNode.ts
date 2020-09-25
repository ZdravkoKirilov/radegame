import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { selectNodeStyleSync, assignHandlers, CommonGameStore, selectNodeHandlers, selectExpressionContext, selectNodeLifecycles, selectChildPropsSync } from "../../helpers";
import { RootItem, RootItemProps } from "./RootItem";

export type EnhancedItemNodeProps = {
  data: RuntimeWidgetNode;
  fromParent: {};
}

type StoreProps = {
  context: ExpressionContext;
  handlers: RuntimeNodeHandler[];
  lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedItemNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };
@GiveAndUseContext
@WithNodeLifecycles
class EnhancedItemNode extends StatefulComponent<Props, State> {
  state: State = { animated: {} };

  render() {
    const self = this;
    const { context, data, handlers } = this.props;
    const { animated } = this.state;
    const style = selectNodeStyleSync(data, self);
    const childProps = selectChildPropsSync(data, self);
    const styleWithTransitionOverrides = { ...style, ...animated };

    return createElement<RzElementPrimitiveProps>(
      'container',
      {
        ...assignHandlers({ self, handlers, context }),
        styles: { z: style.z },
        name: `ItemNode_${data.name}`,
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
      createElement<RootItemProps>(
        RootItem,
        {
          token: data.token,
          style: styleWithTransitionOverrides,
          fromParent: childProps,
        }
      )
    );
  }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedItemNodeProps): StoreProps => ({
  handlers: selectNodeHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore<Props, CommonGameStore>(mapStateToProps)(EnhancedItemNode);