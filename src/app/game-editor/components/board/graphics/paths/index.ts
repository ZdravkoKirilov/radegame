import { RenderFunction, createElement, Points } from "@app/rendering";
import { PathEntity, Slot } from "@app/game-mechanics";
import { toIndexedList } from "@app/shared";

import Path, { Props as PathProps } from './node';

export type Props = {
    paths: PathEntity[];
    locations: Slot[];
    selected: PathEntity;
    selectPath: (item: PathEntity) => void;
}

export const PathsList: RenderFunction<Props> = (props) => {
    const nodesList = toIndexedList(props.locations);

    const lines = props.locations.length ? props.paths.map(elem => {

        const from = {
            left: nodesList[elem.from_slot].x,
            top: nodesList[elem.from_slot].y,
            width: nodesList[elem.from_slot].width,
            height: nodesList[elem.from_slot].height
        }
        const to = {
            left: nodesList[elem.to_slot].x,
            top: nodesList[elem.to_slot].y,
            width: nodesList[elem.to_slot].width,
            height: nodesList[elem.to_slot].height
        }

        const points = computeLinePoints(from, to);
        const polygon = computePolygon(from, to);

        return createElement<PathProps>(Path, {
            points, polygon, key: elem.id,
            selected: props.selected && props.selected.id === elem.id,
            selectPath: () => props.selectPath(elem)
        });

    }) : [];

    return createElement('collection', null, lines);
}

const computePolygon = (from: any, to: any): Points => {
    const x1 = from.left + from.width / 2;
    const y1 = from.top + from.height / 2;
    const x2 = to.left + to.width / 2;
    const y2 = to.top + to.height / 2;

    const padding = 15;
    const polygon = [
        [x1, y1 - padding],
        [x2, y2 - padding],
        [x2, y2 + padding],
        [x1, y1 + padding],
        [x1, y1 - padding],
    ];

    return polygon;
};

const computeLinePoints = (from: any, to: any): Points => {
    const x1 = from.left + from.width / 2;
    const y1 = from.top + from.height / 2;
    const x2 = to.left + to.width / 2;
    const y2 = to.top + to.height / 2;

    const points = [
        [x1, y1],
        [x2, y2],
    ];

    return points;
};

export default PathsList;