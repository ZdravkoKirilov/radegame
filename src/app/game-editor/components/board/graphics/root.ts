import { combineLatest, Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";

import {
    StatefulComponent, createElement, PrimitiveContainer,
    Scrollable, ScrollableProps, AutoClean
} from "@app/render-kit";

import Slots, { Props as SlotProps } from './slots';
import Paths, { Props as PathProps } from './paths';
import Background, { Props as BGProps } from './background';
import { Slot, PathEntity, Stage, GameEntity, ALL_ENTITIES, AllEntity } from "@app/game-mechanics";
import { MainContext } from "./context";
import { AppState } from "@app/core";
import { getActiveStage, SaveItemAction, getEntitiesDict, getItems, GameEntitiesDict } from "../../../state";
import { selectGameId } from "@app/shared";

export type Props = {
    store: Store<AppState>;
    selectSlot: (slot: Slot) => void;
    selectPath: (path: PathEntity) => void;
}

type State = Partial<{
    entities: GameEntitiesDict;
    slots: Slot[];
    paths: PathEntity[];
    stage: Stage;
    selectedSlot: Slot;
    selectedPath: PathEntity;
    gameId: number;
    loaded: boolean;
}>

@AutoClean()
export class RootComponent extends StatefulComponent<Props, State> {
    state = {
        entities: {},
        stage: null,
        selectedSlot: null,
        selectedPath: null,
    } as State

    data$: Subscription;

    didMount() {
        this.data$ = combineLatest(
            this.props.store.pipe(select(getActiveStage)),
            this.props.store.pipe(select(selectGameId)),
            this.props.store.pipe(select(getEntitiesDict)),
            this.props.store.pipe(select(getItems<Slot>(ALL_ENTITIES.slots))),
            this.props.store.pipe(select(getItems<PathEntity>(ALL_ENTITIES.paths))),
        ).pipe(
            map(([stage, gameId, entities, slots, paths]) => {
                this.setState({
                    entities, stage, gameId, loaded: true,
                    slots: slots.filter(slot => slot.owner === stage.id),
                    paths: paths.filter(path => path.owner === stage.id),
                });
            }),
        ).subscribe();
    }

    render() {
        const { stage, selectedSlot, selectedPath, loaded, entities, slots, paths } = this.state;
        const { handleDragMove, handleDragEnd, selectSlot, selectPath } = this;
        const background = loaded && stage ? entities.images[stage.image] : null;

        return loaded ? createElement(MainContext.Provider, { value: { entities } },
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
                    background, stage, selectSlot, selectPath,
                }) : null,

                createElement<PathProps>(Paths, {
                    paths,
                    slots: entities.slots,
                    styles: entities.styles,
                    selectPath,
                    selected: selectedPath,
                }),

                createElement<SlotProps>(Slots, {
                    slots: slots.filter(slot => slot.owner === stage.id),
                    onDragMove: handleDragMove,
                    selectSlot,
                    selected: selectedSlot,
                    onDragEnd: handleDragEnd,
                })
            ),
        ) : null;
    }

    selectSlot = (slot: Slot) => {
        this.setState({ selectedSlot: slot });
        this.props.selectSlot(slot);
    }

    selectPath = (path: PathEntity) => {
        this.setState({ selectedPath: path });
        this.props.selectPath(path);
    }

    handleDragEnd = (slotId: number) => {
        let slot = this.state.slots.find(slot => slot.id === slotId);
        slot = <Slot>{ ...slot, game: this.state.gameId, owner: this.state.stage.id };
        if (this.state.selectedSlot) {
            slot.id = this.state.selectedSlot.id;
        }
        this.setState({ selectedSlot: null });
        this.props.selectSlot(null);

        this.props.store.dispatch(new SaveItemAction({
            key: ALL_ENTITIES.slots as AllEntity,
            data: slot as GameEntity,
        }));
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