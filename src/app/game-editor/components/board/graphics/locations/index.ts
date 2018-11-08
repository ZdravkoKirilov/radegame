import { RenderFunction, createElement, PrimitiveContainer } from "@app/rendering";
import { LocationEntity } from "@app/game-mechanics";

import Node from './node';

type Props = {
    locations: LocationEntity[];
    selected: LocationEntity;
    onDragMove: (comp: PrimitiveContainer) => void;
}

export const LocationsList: RenderFunction<Props> = ({locations, onDragMove}) => {

    const items = locations.map((elem) => {
        return createElement(Node, { data: elem, key: elem.id, onDragMove });
    });

    return createElement('collection', null, items);

}

export default LocationsList;