import { combineLatest } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filter, map } from "rxjs/operators";

import {
    StatefulComponent, createElement, PrimitiveContainer,
    Scrollable, ScrollableProps, AutoClean
} from "@app/render-kit";

import Slots, { Props as SlotProps } from './slots';
import Paths, { Props as PathProps } from './paths';
import Background, { Props as BGProps } from './background';
import { Slot, PathEntity, Stage, ImageAsset, Style, Source } from "@app/game-mechanics";
import { MainContext } from "./context";
import { AppState } from "@app/core";
import { getItems, formKeys, getActiveStage } from "../../../state";
import { selectGameId } from "@app/shared";

export type Props = {
    store: Store<AppState>;
}

type State = Partial<{
    slots: Slot[];
    paths: PathEntity[];
    images: ImageAsset[];
    sources: Source[];
    stage: Stage;
    styles: Style[];
    selectedSlot: Slot;
    selectedPath: PathEntity;
    gameId: number;
}>

@AutoClean()
export class RootComponent extends StatefulComponent<Props, State> {
    state = {
        slots: [],
        paths: [],
        images: [],
        sources: [],
        styles: [],
        stage: null,
        selectedSlot: null,
        selectedPath: null,
    } as State

    data$ = combineLatest<any>(
        this.props.store.pipe(select(getActiveStage)),
        this.props.store.pipe(select(getItems<Slot>(formKeys.slots))),
        this.props.store.pipe(select(getItems<PathEntity>(formKeys.paths))),
        this.props.store.pipe(select(getItems<ImageAsset>(formKeys.images))),
        this.props.store.pipe(select(getItems<Source>(formKeys.sources))),
        this.props.store.pipe(select(getItems<Style>(formKeys.styles))),
        this.props.store.pipe(select(selectGameId)),
    ).pipe(
        filter(data => data.every(elem => !!elem)),
        map(([stage, slots, paths, images, sources, styles, gameId]) => {
            this.setState({
                slots, paths, images, sources, stage, styles, gameId
            });
        }),
    ).subscribe();

    render() {
        const { slots, images, stage, styles, sources, paths, selectedSlot, selectedPath } = this.state;
        const { handleDragMove, handleDragEnd, selectSlot, selectPath } = this;
        const background = images.find(img => img.id === stage.image);
        return createElement(MainContext.Provider, { value: { slots, paths, images, styles } },
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
                createElement<BGProps>(Background, {
                    background, stage, selectSlot, selectPath,
                }),

                createElement<PathProps>(Paths, {
                    paths, slots, styles: styles as any, selectPath,
                    selected: selectedPath,
                }),

                createElement<SlotProps>(Slots, {
                    slots: slots.filter(slot => slot.owner === stage.id),
                    onDragMove: handleDragMove,
                    selectSlot,
                    selected: selectedSlot,
                    images, styles: styles as any, sources,
                    onDragEnd: handleDragEnd,
                })
            ),
        );
    }

    selectSlot = (slot: Slot) => {
        this.setState({ selectedSlot: slot });
    }

    selectPath = (path: PathEntity) => {
        this.setState({ selectedPath: path });
    }

    handleSaveSlot = (payload: Slot) => {
        const { gameId, selectedSlot, stage } = this.state;
        const slot = <Slot>{ ...payload, game: gameId, owner: stage.id };
        if (selectedSlot) {
            slot.id = selectedSlot.id;
        }
        this.setState({ selectedSlot: null });
        // dispatch
    }

    handleDragEnd = (slotId: number) => {
        let slot = this.state.slots.find(elem => elem.id === slotId);
        slot = <Slot>{ ...slot, game: this.state.gameId, owner: this.state.stage.id };
        if (this.state.selectedSlot) {
            slot.id = this.state.selectedSlot.id;
        }
        this.setState({ selectedSlot: null });
        // dispatch
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