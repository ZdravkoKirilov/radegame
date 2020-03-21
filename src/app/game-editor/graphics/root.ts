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
  // fix rendering components for arena
  // transform selectors to use state where necessary
  // test how context will work

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

// import { combineLatest, Subscription, identity } from "rxjs";
// import { Store, select } from "@ngrx/store";
// import { map } from "rxjs/operators";
// import clone from 'immer';
// import get from 'lodash/get';

// import {
//     StatefulComponent, createElement, AutoClean, RzPoint, RenderFunction
// } from "@app/render-kit";

// import Slots, { Props as SlotProps } from './slots';
// import {
//     RuntimeSlot, Stage, ALL_ENTITIES, RuntimeStage, Slot, FrameRenderer, FrameRendererProps, StoreProviderProps,
//     StoreProvider
// } from "@app/game-mechanics";
// import { AppState } from "@app/core";
// import { getActiveStage, SaveItemAction, getEntitiesDict, selectRuntimeStage } from "../state";
// import { selectGameId, Dictionary, safeStringify } from "@app/shared";

// export type Props = {
//     store: Store<AppState>;
//     selectSlot: (slot: RuntimeSlot) => void;
// };

// type State = Partial<{
//     entities: Dictionary;
//     stage: Stage;
//     runtimeStage: RuntimeStage;
//     selectedSlot: RuntimeSlot;
//     gameId: number;
//     loaded: boolean;
// }>

// @AutoClean()
// export class RootComponent extends StatefulComponent<Props, State> {

//     state = {
//         entities: {},
//         stage: null,
//         selectedSlot: null,
//     } as State

//     data$: Subscription;

//     didMount() {
//         this.data$ = combineLatest(
//             this.props.store.pipe(select(getActiveStage)),
//             this.props.store.pipe(select(selectGameId)),
//             this.props.store.pipe(select(getEntitiesDict)),
//             this.props.store.pipe(map(identity)),
//         ).pipe(
//             map(([stage, gameId, entities, state]) => {
//                 let payload: Partial<State> = { entities, stage, gameId, loaded: true };
//                 const runtimeStage = selectRuntimeStage(stage)(state);
//                 if (get(runtimeStage, 'id') !== get(this.state, ['runtimeStage', 'id'])) {
//                     payload.runtimeStage = runtimeStage
//                 }
//                 this.setState(payload);
//             }),
//         ).subscribe();
//     }

//     didCatch(err: any, stack: string) {
//         console.error(err);
//         console.error(stack);
//     }

//     render() {
//         const { selectedSlot, loaded, runtimeStage } = this.state;
//         const { handleDragMove, handleDragEnd, selectSlot } = this;
//         const activeFrame = runtimeStage && runtimeStage.frame_getter ? runtimeStage.frame_getter(runtimeStage) || runtimeStage.frames[0] : null;

//         return loaded ?
//             createElement('container',
//                 {
//                     name: 'background',
//                     onClick: () => {
//                         selectSlot(null);
//                     },
//                 },
//                 activeFrame ? createElement<FrameRendererProps>(FrameRenderer, {
//                     frame: activeFrame as any,
//                     renderStage: (stage: RuntimeStage) => createElement(null)
//                 }) : null,
//                 runtimeStage ? createElement<SlotProps>(Slots, {
//                     slots: runtimeStage.slots as any,
//                     onDragMove: handleDragMove,
//                     selectSlot,
//                     selected: selectedSlot,
//                     onDragEnd: handleDragEnd,
//                 }) : null,
//             ) : null;
//     }

//     selectSlot = (slot: RuntimeSlot) => {
//         const selectedSlot = {
//             ...slot,
//             shape: get(slot, ['shape', 'id']),
//             style_inline: safeStringify(slot.style_inline, ''),
//         } as any;
//         this.setState({ selectedSlot });
//         this.props.selectSlot(selectedSlot);
//     }

//     handleDragEnd = (slotId: number) => {
//         const existingSlot = this.state.stage.slots.find(slot => slot.id === slotId);
//         const existingRuntimeSlot = this.state.runtimeStage.slots.find(slot => slot.id === slotId);
//         let slot = <Slot>{
//             ...existingSlot,
//             x: existingRuntimeSlot.x,
//             y: existingRuntimeSlot.y
//         };
//         this.setState({ selectedSlot: null });
//         this.props.selectSlot(null);

//         const index = this.state.stage.slots.findIndex(childSlot => childSlot.id === slot.id);

//         const runtimeStage = clone(this.state.runtimeStage, draft => {
//             draft.slots[index] = existingRuntimeSlot;
//         });

//         this.setState({ runtimeStage });

//         const newStageData = clone(runtimeStage, draft => {
//             draft.slots = draft.slots.map((slot, index) => ({
//                 ...get(this.state.stage, ['slots', index], {}),
//                 x: slot.x,
//                 y: slot.y,
//             }));
//         });

//         this.props.store.dispatch(new SaveItemAction({
//             key: ALL_ENTITIES.stages,
//             data: newStageData,
//         }));
//     }

//     handleDragMove = (id: number, coords: RzPoint) => {
//         const { x, y } = coords;
//         const slots = this.state.runtimeStage.slots;
//         const index = slots.findIndex(elem => elem.id === id);
//         const node = slots[index];
//         const newNodes = [...slots];
//         const newNode = { ...node, x, y };
//         newNodes[index] = newNode;

//         this.setState({
//             runtimeStage: { ...this.state.runtimeStage, slots: newNodes }
//         });
//     }
// }

// export const ConnectedRootComponent: RenderFunction<Props> = (props: Props) => {
//     return (
//         createElement<StoreProviderProps>(StoreProvider, { store: props.store }, createElement(RootComponent, { ...props }))
//     );
// }