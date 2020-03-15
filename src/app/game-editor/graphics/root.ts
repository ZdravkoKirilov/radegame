import { combineLatest, Subscription, identity } from "rxjs";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import clone from 'immer';
import get from 'lodash/get';

import {
    StatefulComponent, createElement, ScrollableProps, AutoClean, MetaProps, RzPoint
} from "@app/render-kit";

import Slots, { Props as SlotProps } from './slots';
import { RuntimeSlot, Stage, ALL_ENTITIES, RuntimeStage, Slot, FrameRenderer, FrameRendererProps } from "@app/game-mechanics";
import { AppState } from "@app/core";
import { getActiveStage, SaveItemAction, getEntitiesDict, selectRuntimeStage, selectStageSlots } from "../state";
import { selectGameId, Dictionary, safeStringify } from "@app/shared";

export type Props = {
    store: Store<AppState>;
    selectSlot: (slot: RuntimeSlot) => void;
};

type State = Partial<{
    entities: Dictionary;
    stage: Stage;
    runtimeStage: RuntimeStage;
    selectedSlot: RuntimeSlot;
    gameId: number;
    loaded: boolean;
}>

@AutoClean()
export class RootComponent extends StatefulComponent<Props, State> {
    constructor(props: Props, meta: MetaProps) {
        super(props, meta);
        this.meta.context.set('store', this.props.store);
    }

    state = {
        entities: {},
        stage: null,
        selectedSlot: null,
    } as State

    data$: Subscription;

    didMount() {
        this.data$ = combineLatest(
            this.props.store.pipe(select(getActiveStage)),
            this.props.store.pipe(select(selectGameId)),
            this.props.store.pipe(select(getEntitiesDict)),
            this.props.store.pipe(map(identity)),
        ).pipe(
            map(([stage, gameId, entities, state]) => {
                let payload: Partial<State> = { entities, stage, gameId, loaded: true };
                const runtimeStage = selectRuntimeStage(stage)(state);
                if (get(runtimeStage, 'id') !== get(this.state, ['runtimeStage', 'id'])) {
                    payload.runtimeStage = runtimeStage
                }
                this.setState(payload);
            }),
        ).subscribe();
    }

    didCatch(err: any, stack: string) {
        console.error(err);
        console.error(stack);
    }

    render() {
        const { selectedSlot, loaded, runtimeStage } = this.state;
        const { handleDragMove, handleDragEnd, selectSlot } = this;
        const activeFrame = runtimeStage && runtimeStage.frame_getter ? runtimeStage.frame_getter(runtimeStage) || runtimeStage.frames[0] : null;

        return loaded ?
            createElement<ScrollableProps>('container', {
                // width: window.innerWidth - 200,
                // height: window.innerHeight,
                // x: 10,
                // y: 10,
                // vertical: true,
                // horizontal: true,
                // borderSize: 1,
                // borderColor: 0x161616,
                // padding: '0 0',
            },
                createElement('container', {
                    name: 'background',
                    onClick: () => {
                        selectSlot(null);
                    },
                },
                    activeFrame ? createElement<FrameRendererProps>(FrameRenderer, {
                        frame: activeFrame as any,
                        renderStage: (stage: RuntimeStage) => createElement(null)
                    }) : null,
                ),

                runtimeStage ? createElement<SlotProps>(Slots, {
                    slots: runtimeStage.slots as any,
                    onDragMove: handleDragMove,
                    selectSlot,
                    selected: selectedSlot,
                    onDragEnd: handleDragEnd,
                }) : null,
            ) : null;
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

    handleDragEnd = (slotId: number) => {
        const existingSlot = this.state.stage.slots.find(slot => slot.id === slotId);
        const existingRuntimeSlot = this.state.runtimeStage.slots.find(slot => slot.id === slotId);
        let slot = <Slot>{
            ...existingSlot,
            x: existingRuntimeSlot.x,
            y: existingRuntimeSlot.y
        };
        this.setState({ selectedSlot: null });
        this.props.selectSlot(null);

        const index = this.state.stage.slots.findIndex(childSlot => childSlot.id === slot.id);

        const runtimeStage = clone(this.state.runtimeStage, draft => {
            draft.slots[index] = existingRuntimeSlot;
        });

        this.setState({ runtimeStage });

        const newStageData = clone(runtimeStage, draft => {
            draft.slots = draft.slots.map((slot, index) => ({
                ...get(this.state.stage, ['slots', index], {}),
                x: slot.x,
                y: slot.y,
            }));
        });

        this.props.store.dispatch(new SaveItemAction({
            key: ALL_ENTITIES.stages,
            data: newStageData,
        }));
    }

    handleDragMove = (id: number, coords: RzPoint) => {
        const { x, y } = coords;
        const slots = this.state.runtimeStage.slots;
        const index = slots.findIndex(elem => elem.id === id);
        const node = slots[index];
        const newNodes = [...slots];
        const newNode = { ...node, x, y };
        newNodes[index] = newNode;

        this.setState({
            runtimeStage: { ...this.state.runtimeStage, slots: newNodes }
        });
    }
}