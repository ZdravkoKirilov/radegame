import {
    StatefulComponent, createElement, PrimitiveContainer,
    Lifecycles, WithAsset, WithAssetProps, SpriteProps, Scrollable, ScrollableProps
} from "@app/rendering";

import Slots, { Props as SlotProps } from './slots';
import Paths, { Props as PathProps } from './paths';
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

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = {
        slots: []
    }

    render() {
        const { paths, selectedPath, selectPath, selectedSlot, selectSlot, stage, images, styles, sources } = this.props;
        const { slots } = this.state;
        const { handleDragMove, handleDragEnd } = this;
        const background = images.find(img => img.id === stage.image);

        return createElement<any>(MainContext.Provider, { value: slots }, createElement<ScrollableProps>(Scrollable, {
            width: 1100,
            height: 650,
            x: 10,
            y: 10,
            vertical: true,
            horizontal: true,
            borderSize: 1,
            borderColor: 0x161616,
            padding: '0 0'
        },

            createElement('container', null,
                createElement<WithAssetProps>(WithAsset, { url: background.image },
                    createElement('container', {
                        onClick: () => {
                            this.props.selectSlot(null);
                            this.props.selectPath(null);
                        },
                    },
                        createElement<SpriteProps>('sprite', {
                            image: background.image,
                            styles: {
                                x: 0,
                                y: 0,
                                width: stage.width,
                                height: stage.height,
                            },
                        }))
                ),
            ),

            createElement<PathProps>(Paths, {
                paths, slots, styles,
                selectPath,
                selected: selectedPath,
            }),

            createElement<SlotProps>(Slots, {
                slots, onDragMove: handleDragMove,
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