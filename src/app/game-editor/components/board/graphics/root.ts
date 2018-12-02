import { StatefulComponent, createElement, PrimitiveContainer, Lifecycles, WithAsset, WithAssetProps } from "@app/rendering";

import Locations from './locations';
import Paths, { Props as PathProps } from './paths';
import { Slot, PathEntity, Stage } from "@app/game-mechanics";

export type Props = {
    locations: Array<Slot>;
    selectedLocation: Slot;
    paths: Array<PathEntity>;
    selectedPath: PathEntity;
    stage: Stage;
    onLocationSelected: (item: Slot) => void;
    selectPath: (item: PathEntity) => void;
    onDragEnded: (item: Slot) => void;
}

type State = {
    locations: Array<Slot>;
}

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = {
        locations: []
    }

    render() {
        const { paths, selectedPath, selectPath, stage } = this.props;
        const { locations } = this.state;
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
                paths, locations,
                selectPath,
                selected: selectedPath
            }),

            createElement(Locations, { locations, onDragMove: handleDragMove }),
        );

    }

    didMount() {
        const { locations } = this.props;
        this.setState({ locations });
    }

    handleDragMove = (comp: PrimitiveContainer) => {
        const { x, y } = comp.props.styles;
        const { id } = comp.props;
        const { locations } = this.state;
        const index = locations.findIndex(elem => elem.id === id);
        const node = locations[index];
        const newNodes = [...locations];
        newNodes[index] = { ...node, x, y };

        this.setState({ locations: newNodes });
    }
}