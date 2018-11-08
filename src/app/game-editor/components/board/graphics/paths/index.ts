import { RenderFunction, createElement, Points } from "@app/rendering";
import { PathEntity, LocationEntity } from "@app/game-mechanics";
import { toIndexedList } from "@app/shared";

import Path from './node';


type Props = {
    paths: PathEntity[];
    locations: LocationEntity[];
    selected: PathEntity;
}

export const PathsList: RenderFunction<Props> = (props) => {
    const nodesList = toIndexedList(props.locations);

    const lines = props.locations.length ? props.paths.map(elem => {

        const from = {
            left: nodesList[elem.from_loc].x,
            top: nodesList[elem.from_loc].y,
            width: nodesList[elem.from_loc].width,
            height: nodesList[elem.from_loc].height
        }
        const to = {
            left: nodesList[elem.to_loc].x,
            top: nodesList[elem.to_loc].y,
            width: nodesList[elem.to_loc].width,
            height: nodesList[elem.to_loc].height
        }

        const points = computeLinePoints(from, to);
        const polygon = computePolygon(from, to);

        return createElement(Path,
            {
                points, polygon, key: elem.id
            }
        );
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