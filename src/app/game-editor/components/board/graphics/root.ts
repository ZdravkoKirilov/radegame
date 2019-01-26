import {
    StatefulComponent, createElement, PrimitiveContainer,
    Lifecycles, WithAsset, WithAssetProps, SpriteProps
} from "@app/rendering";

import Slots, { Props as SlotProps } from './slots';
import Paths, { Props as PathProps } from './paths';
import { Slot, PathEntity, Stage, ImageAsset } from "@app/game-mechanics";

export type Props = {
    slots: Array<Slot>;
    selectedSlot: Slot;
    paths: Array<PathEntity>;
    selectedPath: PathEntity;
    stage: Stage;
    images: Array<ImageAsset>;
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
        const { paths, selectedPath, selectPath, selectedSlot, selectSlot, stage, images } = this.props;
        const { slots } = this.state;
        const { handleDragMove, handleDragEnd } = this;
        const background = images.find(img => img.id === stage.image);
        const stageImage = background ? background.thumbnail || background.svg: '';
        return createElement('fragment', {},

            createElement<WithAssetProps>(WithAsset, { url: stageImage, },
                createElement('container', {
                    onClick: () => {
                        this.props.selectSlot(null);
                        this.props.selectPath(null);
                    },
                },
                    createElement<SpriteProps>('sprite', {
                        image: stageImage,
                        styles: {
                            x: 0,
                            y: 0,
                            width: stage.width,
                            height: stage.height,
                        },
                    }))
            ),

            createElement<PathProps>(Paths, {
                paths, slots,
                selectPath,
                selected: selectedPath
            }),

            createElement<SlotProps>(Slots, {
                slots, onDragMove: handleDragMove,
                selectSlot,
                selected: selectedSlot,
                images,
                onDragEnd: handleDragEnd
            }),

            // createElement('ellipse', {
            //     styles: {
            //         x: 300, y: 300, width: 100, height: 100,
            //         strokeColor: 0xFF0000, strokeThickness: 5
            //     },
            //     button: true,
            // })
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