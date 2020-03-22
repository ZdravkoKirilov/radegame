import { Store } from "@ngrx/store";
import clone from 'immer';
import get from 'lodash/get';

import {
  StatefulComponent, createElement, AutoClean, RzPoint, RenderFunction
} from "@app/render-kit";

import {
  RuntimeSlot, Stage, ALL_ENTITIES, RuntimeStage, Slot, StoreProviderProps,
  StoreProvider, StageRenderer, StageRendererProps, connectToStore, RuntimeImageFrame, GameTemplate, ExpressionContext,
  selectStageSlotsSync,
} from "@app/game-mechanics";
import { AppState } from "@app/core";
import {
  SaveItemAction, selectRuntimeStage, selectStageFrame, selectEntitiesDictionary, selectExpressionContext,
} from "../state";
import { safeStringify } from "@app/shared";

import DraggableSlot, { Props as NodeProps } from './node/DraggableSlot';
import StaticStage, { StaticStageProps } from "./node/StaticStage";

type Props = OwnProps & StoreProps;

type OwnProps = {
  store: Store<AppState>;
  stage: Stage;
  selectSlot: (slot: RuntimeSlot) => void;
}

type StoreProps = {
  runtimeStage: RuntimeStage;
  frame: RuntimeImageFrame;
  entities: GameTemplate;
  context: ExpressionContext;
}

type State = { selectedSlot: Slot; runtimeStage: RuntimeStage };

@AutoClean()
export class RootComponent extends StatefulComponent<Props, State> {

  state: State = {} as State;

  didCatch(err: any, stack: string) {
    console.error(err);
    console.error(stack);
  }

  willReceiveProps(nextProps: Props) {
    if (nextProps.runtimeStage !== this.props.runtimeStage) {
      this.setState({ runtimeStage: nextProps.runtimeStage });
    }
  }

  didMount() {
    this.setState({ runtimeStage: this.props.runtimeStage });
  }

  selectSlot = (slot: RuntimeSlot) => {
    const selectedSlot = {
      ...slot,
      shape: get(slot, ['shape', 'id']),
      style_inline: safeStringify(slot.style_inline, ''),
    } as any;
    this.setState({ selectedSlot });
    this.props.selectSlot(selectedSlot);
  }

  handleDragEnd = (id: number, coords: RzPoint) => {
    const slotIndex = this.props.stage.slots.findIndex(elem => elem.id === id);

    const newStageData = clone(this.props.stage, draft => {
      draft.slots[slotIndex].x = coords.x;
      draft.slots[slotIndex].y = coords.y;
    });

    const newRuntimeStageData = clone(this.state.runtimeStage, draft => {
      draft.slots[slotIndex].x = coords.x;
      draft.slots[slotIndex].y = coords.y;
    });

    this.setState({ selectedSlot: null, runtimeStage: newRuntimeStageData });
    this.props.selectSlot(null);

    this.props.store.dispatch(new SaveItemAction({
      key: ALL_ENTITIES.stages,
      data: newStageData,
    }));
  }

  // todo
  // non-engine related bringToFront()

  render() {
    const { handleDragEnd, selectSlot } = this;
    const { selectedSlot, runtimeStage } = this.state;
    const { frame, entities, context } = this.props;
    const slots = selectStageSlotsSync(entities, context, this.state.runtimeStage, this.state);
    const loaded = !!runtimeStage && slots;

    return loaded ?
      createElement('container',
        {
          name: 'background',
          onClick: () => {
            selectSlot(null);
          },
        },
        createElement<StageRendererProps>(
          StageRenderer,
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
            stage: runtimeStage,
            style: { width: runtimeStage.width, height: runtimeStage.height },
            frame,
            renderStaticStage: stage => {
              return createElement<StaticStageProps>(StaticStage, {
                stage,
                style: { width: runtimeStage.width, height: runtimeStage.height }
              });
            }
          }
        )
      ) : null;
  }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StoreProps => ({
  runtimeStage: selectRuntimeStage(ownProps.stage)(state),
  frame: selectStageFrame(ownProps.stage)(state),
  entities: selectEntitiesDictionary(state),
  context: selectExpressionContext(state),
});

const rootComponentWithStore = connectToStore(mapStateToProps)(RootComponent);

export const ConnectedRootComponent: RenderFunction<Props> = (props: Props) => {
  return (
    createElement<StoreProviderProps>(StoreProvider, { store: props.store }, createElement(rootComponentWithStore, { ...props }))
  );
};
