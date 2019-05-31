import {
    StatefulComponent, createElement, PrimitiveContainer,
    Scrollable, ScrollableProps
} from "@app/render-kit";

import Slots, { Props as SlotProps } from './slots';
import Paths, { Props as PathProps } from './paths';
import Background, { Props as BGProps } from './background';
import { Slot, PathEntity, Stage, ImageAsset, Style, Source } from "@app/game-mechanics";
import { MainContext } from "./context";

export type Props = {
    slots: Array<Slot>;
    selectedSlot: Slot;
    paths: Array<PathEntity>;
    selectedPath: PathEntity;
    stage: Stage;
    images: Array<ImageAsset>;
    sources: Source[];
    styles: Style[];
    selectPath: (item: PathEntity) => void;
    selectSlot: (item: Slot) => void;
    onDragEnd: (item: Slot) => void;
}

type State = {
    slots: Array<Slot>;
}

export class RootComponent extends StatefulComponent<Props, State> {
    state = {
        slots: []
    }

    render() {
        const { paths, selectedPath, selectPath, selectedSlot,
            selectSlot, stage, images, styles, sources } = this.props;
        const { slots } = this.state;
        const { handleDragMove, handleDragEnd } = this;
        const background = images.find(img => img.id === stage.image);
        return createElement<any>(MainContext.Provider, { value: { slots, paths, images, styles } },
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
                    paths, slots, styles, selectPath,
                    selected: selectedPath,
                }),

                createElement<SlotProps>(Slots, {
                    slots: slots.filter(slot => slot.owner === stage.id),
                    onDragMove: handleDragMove,
                    selectSlot,
                    selected: selectedSlot,
                    images, styles, sources,
                    onDragEnd: handleDragEnd,
                })
            ),
        );
    }

    willReceiveProps({ slots }: Props) {
        if (slots !== this.props.slots) {
            this.setState({ slots });
        }
    }

    didMount() {
        const { slots } = this.props;
        this.setState({ slots });
    }

    handleDragEnd = (slotId: number) => {
        const slot = this.state.slots.find(elem => elem.id === slotId);
        this.props.onDragEnd(slot);
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