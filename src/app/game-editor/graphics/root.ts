import { Store } from "@ngrx/store";
import clone from 'immer';
import isString from 'lodash/isString';

import {
  StatefulComponent, createElement, AutoClean, RzPoint, RenderFunction
} from "@app/render-kit";
import {
  RuntimeWidgetNode, Widget, ALL_ENTITIES, RuntimeWidget, WidgetNode, StoreProviderProps,
  StoreProvider, ExpressionContext, RootWidgetProps, RootWidget, CommonGameStore, selectRuntimeWidget,
  selectExpressionContext,
  connectToStore,
  WidgetNodeId,
} from "@app/game-mechanics";
import { AppState } from "@app/core";

import { SaveItemAction, selectCommonGameStore } from "../state";

import DraggableNode, { Props as NodeProps } from './node/DraggableNode';

export type EditorRootProps = OwnProps & StoreProps;

type OwnProps = {
  store: Store<AppState>;
  widget: Widget;
  selectNode: (node: WidgetNode) => void;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
}

type State = { selectedNode: WidgetNode; runtimeWidget: RuntimeWidget };

@AutoClean()
export class rootComponent extends StatefulComponent<EditorRootProps, State> {

  state: State = {} as State;

  didCatch(err: any, stack: string) {
    console.error(err);
    console.error(stack);
  }

  willReceiveProps(nextProps: EditorRootProps) {
    if (nextProps.runtimeWidget !== this.props.runtimeWidget) {
      this.setState({ runtimeWidget: nextProps.runtimeWidget });
    }
  }

  didMount() {
    this.setState({ runtimeWidget: this.props.runtimeWidget });
  }

  selectNode = (node: RuntimeWidgetNode) => {
    const selectedNode = this.props.widget.nodes.find(elem => elem.id === node.id);
    this.setState({ selectedNode });
    this.props.selectNode(selectedNode);
  }

  handleDragEnd = (id: WidgetNodeId, coords: RzPoint) => {
    const nodeIndex = this.props.widget.nodes.findIndex(elem => elem.id === id);

    const newRuntimeWidgetData = clone(this.state.runtimeWidget, draft => {
      const targetNode = draft.nodes[nodeIndex];
      targetNode.style_inline = isString(targetNode.style_inline) ?  JSON.parse(targetNode.style_inline) : {};
      targetNode.style_inline.x = coords.x;
      targetNode.style_inline.y = coords.y;
    });

    this.setState({ selectedNode: null, runtimeWidget: newRuntimeWidgetData });
    this.props.selectNode(null);

    this.props.store.dispatch(new SaveItemAction({
      key: ALL_ENTITIES.nodes,
      data: {
        ...newRuntimeWidgetData.nodes[nodeIndex],
        style_inline: JSON.stringify(newRuntimeWidgetData.nodes[nodeIndex].style_inline) as any
      },
    }));
  }

  render() {
    const { handleDragEnd, selectNode } = this;
    const { selectedNode: selectedNode } = this.state;
    const { widget } = this.props;

    return createElement('container',
      {
        name: 'background',
        onClick: () => {
          selectNode(null);
        },
      },
      createElement<RootWidgetProps>(
        RootWidget,
        {
          renderChild: (node: RuntimeWidgetNode) => {
            return createElement<NodeProps>(DraggableNode, {
              data: node,
              key: node.id,
              onDragEnd: handleDragEnd,
              onSelect: selectNode,
              selected: selectedNode && selectedNode.id === node.id,
            });
          },
          widget,
        }
      )
    );
  }
}

const mapStateToProps = (state: CommonGameStore, ownProps: OwnProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

const RootComponent = connectToStore(mapStateToProps)(rootComponent);

export const ConnectedRootComponent: RenderFunction<EditorRootProps> = (props: EditorRootProps) => {
  return (
    createElement<StoreProviderProps>(
      StoreProvider,
      { store: props.store, selectCommonGameStore },
      createElement(RootComponent, { ...props })
    )
  );
};
