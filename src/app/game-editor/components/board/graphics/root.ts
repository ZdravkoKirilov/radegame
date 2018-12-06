import { StatefulComponent, createElement, PrimitiveContainer, Lifecycles, WithAsset, WithAssetProps } from "@app/rendering";

import Slots from './slots';
import Paths, { Props as PathProps } from './paths';
import { Slot, PathEntity, Stage } from "@app/game-mechanics";

export type Props = {
    slots: Array<Slot>;
    selectedSlot: Slot;
    paths: Array<PathEntity>;
    selectedPath: PathEntity;
    stage: Stage;
    onSlotSelected: (item: Slot) => void;
    selectPath: (item: PathEntity) => void;
    onDragEnded: (item: Slot) => void;
}

type State = {
    slots: Array<Slot>;
}

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = {
        slots: []
    }

    render() {
        const { paths, selectedPath, selectPath, stage } = this.props;
        const { slots } = this.state;
        const { handleDragMove } = this;

        return createElement('fragment', {},

            createElement<WithAssetProps>(WithAsset, { url: stage.image, }, createElement('sprite', {
                image: stage.image,
                styles: {
                    x: 0,
                    y: 0,
                    width: stage.width,
                    height: stage.height,
                }
            })),

            createElement<PathProps>(Paths, {
                paths, slots,
                selectPath,
                selected: selectedPath
            }),

            createElement(Slots, { slots, onDragMove: handleDragMove }),
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

    handleDragMove = (comp: PrimitiveContainer) => {
        const { x, y } = comp.props.styles;
        const { id } = comp.props;
        const { slots } = this.state;
        const index = slots.findIndex(elem => elem.id === id);
        const node = slots[index];
        const newNodes = [...slots];
        newNodes[index] = { ...node, x, y };

        this.setState({ slots: newNodes });
    }
}