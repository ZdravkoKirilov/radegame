import { Store } from "@ngrx/store";
import clone from 'immer';

import {
  StatefulComponent, createElement, AutoClean, RzPoint, RenderFunction
} from "@app/render-kit";

import {
  RuntimeWidgetNode, Widget, ALL_ENTITIES, RuntimeWidget, WidgetNode, StoreProviderProps,
  StoreProvider, WidgetRenderer, WidgetRendererProps, connectToStore, ExpressionContext,
  selectWidgetNodesSync,
  selectWidgetFrameSync,
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import {
  SaveItemAction, selectRuntimeWidget, selectExpressionContext,
} from "../state";

import DraggableNode, { Props as NodeProps } from './node/DraggableNode';
import StaticWidget, { StaticWidgetProps } from "./node/StaticWidget";

type Props = OwnProps & StoreProps;

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
export class RootComponent extends StatefulComponent<Props, State> {

  state: State = {} as State;

  didCatch(err: any, stack: string) {
    console.error(err);
    console.error(stack);
  }

  willReceiveProps(nextProps: Props) {
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

  handleDragEnd = (id: number, coords: RzPoint) => {
    const nodeIndex = this.props.widget.nodes.findIndex(elem => elem.id === id);

    const newWidgetData = clone(this.props.widget, draft => {
      draft.nodes[nodeIndex].x = coords.x;
      draft.nodes[nodeIndex].y = coords.y;
    });

    const newRuntimeWidgetData = clone(this.state.runtimeWidget, draft => {
      draft.nodes[nodeIndex].x = coords.x;
      draft.nodes[nodeIndex].y = coords.y;
    });

    this.setState({ selectedNode: null, runtimeWidget: newRuntimeWidgetData });
    this.props.selectNode(null);

    this.props.store.dispatch(new SaveItemAction({
      key: ALL_ENTITIES.nodes,
      data: newWidgetData.nodes[nodeIndex],
    }));
  }

  // todo
  // non-engine related bringToFront()

  render() {
    const self = this;
    const { handleDragEnd, selectNode } = this;
    const { selectedNode: selectedNode, runtimeWidget } = this.state;
    const { context } = this.props;
    const nodes = selectWidgetNodesSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);
    const loaded = !!runtimeWidget && nodes;

    return loaded ?
      createElement('container',
        {
          name: 'background',
          onClick: () => {
            selectNode(null);
          },
        },
        createElement<WidgetRendererProps>(
          WidgetRenderer,
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
            nodes: nodes,
            widget: runtimeWidget,
            style: { width: runtimeWidget.width, height: runtimeWidget.height },
            frame,
            renderFrame: widget => {
              return createElement<StaticWidgetProps>(StaticWidget, {
                widget,
                style: { width: runtimeWidget.width, height: runtimeWidget.height }
              });
            }
          }
        )
      ) : null;
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

const rootComponentWithStore = connectToStore(mapStateToProps)(RootComponent);

export const ConnectedRootComponent: RenderFunction<Props> = (props: Props) => {
  return (
    createElement<StoreProviderProps>(StoreProvider, { store: props.store }, createElement(rootComponentWithStore, { ...props }))
  );
};
