import { Store } from "@ngrx/store";
import clone from 'immer';

import {
  StatefulComponent, createElement, AutoClean, RzPoint, RenderFunction
} from "@app/render-kit";

import {
  RuntimeSlot, Widget, ALL_ENTITIES, RuntimeWidget, Slot, StoreProviderProps,
  StoreProvider, WidgetRenderer, WidgetRendererProps, connectToStore, ExpressionContext,
  selectWidgetSlotsSync,
  selectWidgetFrameSync,
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import {
  SaveItemAction, selectRuntimeWidget, selectExpressionContext,
} from "../state";

import DraggableSlot, { Props as NodeProps } from './node/DraggableSlot';
import StaticWidget, { StaticWidgetProps } from "./node/StaticWidget";

type Props = OwnProps & StoreProps;

type OwnProps = {
  store: Store<AppState>;
  widget: Widget;
  selectSlot: (slot: Slot) => void;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
}

type State = { selectedSlot: Slot; runtimeWidget: RuntimeWidget };

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

  selectSlot = (slot: RuntimeSlot) => {
    const selectedSlot = this.props.widget.slots.find(elem => elem.id === slot.id);
    this.setState({ selectedSlot });
    this.props.selectSlot(selectedSlot);
  }

  handleDragEnd = (id: number, coords: RzPoint) => {
    const slotIndex = this.props.widget.slots.findIndex(elem => elem.id === id);

    const newWidgetData = clone(this.props.widget, draft => {
      draft.slots[slotIndex].x = coords.x;
      draft.slots[slotIndex].y = coords.y;
    });

    const newRuntimeWidgetData = clone(this.state.runtimeWidget, draft => {
      draft.slots[slotIndex].x = coords.x;
      draft.slots[slotIndex].y = coords.y;
    });

    this.setState({ selectedSlot: null, runtimeWidget: newRuntimeWidgetData });
    this.props.selectSlot(null);

    this.props.store.dispatch(new SaveItemAction({
      key: ALL_ENTITIES.slots,
      data: newWidgetData.slots[slotIndex],
    }));
  }

  // todo
  // non-engine related bringToFront()

  render() {
    const self = this;
    const { handleDragEnd, selectSlot } = this;
    const { selectedSlot, runtimeWidget } = this.state;
    const { context } = this.props;
    const slots = selectWidgetSlotsSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);
    const loaded = !!runtimeWidget && slots;

    return loaded ?
      createElement('container',
        {
          name: 'background',
          onClick: () => {
            selectSlot(null);
          },
        },
        createElement<WidgetRendererProps>(
          WidgetRenderer,
          {
            renderChild: (slot: RuntimeSlot) => {
              return createElement<NodeProps>(DraggableSlot, {
                data: slot,
                key: slot.id,
                onDragEnd: handleDragEnd,
                onSelect: selectSlot,
                selected: selectedSlot && selectedSlot.id === slot.id,
              });
            },
            slots,
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
