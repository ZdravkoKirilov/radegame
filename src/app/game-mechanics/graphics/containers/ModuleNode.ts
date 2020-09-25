import { createElement, RzElementPrimitiveProps, StatefulComponent } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import { RuntimeWidgetNode, RuntimeNodeHandler, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers } from "../../helpers/event-handlers";
import { selectNodeStyleSync, selectNodeHandlers, CommonGameStore, selectExpressionContext, selectNodeLifecycles, selectChildPropsSync } from "../../helpers";
import { ModuleRendererProps, ModuleRenderer } from "./ModuleRenderer";

export type ModuleNodeProps = {
  data: RuntimeWidgetNode;
  fromParent?: {};
};

type StoreProps = {
  handlers: RuntimeNodeHandler[];
  context: ExpressionContext;
  lifecycles: RuntimeNodeLifecycle[];
};

type Props = ModuleNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@WithNodeLifecycles
@GiveAndUseContext
class EnhancedModuleNode extends StatefulComponent<Props, State> {
  state: State = { animated: {} };

  render() {
    const self = this;
    const { data, handlers, context } = this.props;
    const { animated } = this.state;
    const style = selectNodeStyleSync(data, self);
    const childProps = selectChildPropsSync(data, self);
    const styleWithTransitionOverrides = { ...style, ...animated };

    return createElement<RzElementPrimitiveProps>(
      'container',
      {
        ...assignHandlers({ self, handlers, context }),
        styles: { z: style.z },
        name: `ModuleNode_${data.name}`,
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
      createElement<RzElementPrimitiveProps>(
        'container',
        { styles: styleWithTransitionOverrides },
        createElement<ModuleRendererProps>(
          ModuleRenderer,
          { module: data.module, fromParent: childProps }
        )
      )
    );
  }
};

const mapStateToProps = (state: CommonGameStore, ownProps: ModuleNodeProps): StoreProps => ({
  handlers: selectNodeHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedModuleNode);