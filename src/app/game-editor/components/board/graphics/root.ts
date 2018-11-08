import { StatefulComponent, createElement, PrimitiveContainer, Lifecycles } from "@app/rendering";

import Locations from './locations';
import Paths from './paths';
import { LocationEntity, PathEntity, Stage } from "@app/game-mechanics";

export type Props = {
    locations: Array<LocationEntity>;
    selectedLocation: LocationEntity;
    paths: Array<PathEntity>;
    selectedPath: PathEntity;
    stage: Stage;
}

type State = {
    locations: Array<LocationEntity>;
}

export class RootComponent extends StatefulComponent<Props, State> implements Lifecycles {
    state = {
        locations: []
    }

    render() {
        const { paths } = this.props;
        const { locations } = this.state;
        const { handleDragMove } = this;

        return createElement('fragment', {},
            createElement(Paths, { paths, locations }),
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