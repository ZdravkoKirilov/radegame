import { combineLatest, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";

import {
    StatefulComponent, createElement, PrimitiveContainer,
    Scrollable, ScrollableProps, AutoClean, MetaProps
} from "@app/render-kit";

import Slots, { Props as SlotProps } from './slots';
import Background, { Props as BGProps } from './background';
import { RuntimeSlot, Stage, GameEntity, ALL_ENTITIES, AllEntity } from "@app/game-mechanics";
import { AppState } from "@app/core";
import { getActiveStage, SaveItemAction, getEntitiesDict, getItems } from "../../../state";
import { selectGameId, Dictionary } from "@app/shared";

export type Props = {
    store: Store<AppState>;
    selectSlot: (slot: RuntimeSlot) => void;
}

type State = Partial<{
    entities: Dictionary;
    slots: RuntimeSlot[];
    stage: Stage;
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
        ).pipe(
            map(([stage, gameId, entities]) => {
                this.setState({
                    entities, stage, gameId, loaded: true,
                    slots: stage.slots as any,
                });
            }),
        ).subscribe();
    }

    didCatch(err: any, stack: string) {
        console.error(err);
        console.error(stack);
    }

    render() {
        const { stage, selectedSlot, loaded, entities, slots } = this.state;
        const { handleDragMove, handleDragEnd, selectSlot } = this;
        const background = loaded && stage ? entities.images[stage.image as number] : null;

        return loaded ?
            createElement<ScrollableProps>(Scrollable, {
                width: window.innerWidth - 200,
                height: window.innerHeight,
                x: 10,
                y: 10,
                vertical: true,
                horizontal: true,
                borderSize: 1,
                borderColor: 0x161616,
                padding: '0 0',
            },
                background ? createElement<BGProps>(Background, {
                    background, stage, selectSlot,
                }) : null,

                createElement<SlotProps>(Slots, {
                    slots: slots.filter(slot => slot.owner === stage.id),
                    onDragMove: handleDragMove,
                    selectSlot,
                    selected: selectedSlot,
                    onDragEnd: handleDragEnd,
                }),
            ) : null;
    }

    selectSlot = (slot: RuntimeSlot) => {
        this.setState({ selectedSlot: slot });
        this.props.selectSlot(slot);
    }

    handleDragEnd = (slotId: number) => {
        let slot = this.state.slots.find(slot => slot.id === slotId);
        slot = <RuntimeSlot>{ ...slot, game: this.state.gameId, owner: this.state.stage.id };
        if (this.state.selectedSlot) {
            slot.id = this.state.selectedSlot.id;
        }
        this.setState({ selectedSlot: null });
        this.props.selectSlot(null);

        // this.props.store.dispatch(new SaveItemAction({
        //     key: ALL_ENTITIES.slots as AllEntity,
        //     data: slot as GameEntity,
        // }));
    }

    handleDragMove = (comp: PrimitiveContainer) => {
        const { x, y } = comp.props.styles;
        const { id } = comp.props;
        const { slots } = this.state;
        const index = slots.findIndex(elem => elem.id === id);
        const node = slots[index];
        const newNodes = [...slots];
        const newNode = { ...node, x, y };
        newNodes[index] = newNode;

        this.setState({ slots: newNodes });
    }
}