import { RenderFunction, createElement, Points } from "@app/rendering";
import { PathEntity, Slot, Style } from "@app/game-mechanics";
import { toDictionary } from "@app/shared";

import Path, { Props as PathProps } from './node';

export type Props = {
    paths: PathEntity[];
    slots: Slot[];
    styles: Style[];
    selected: PathEntity;
    selectPath: (item: PathEntity) => void;
}

export const PathsList: RenderFunction<Props> = (props) => {
    const nodesList = toDictionary(props.slots);

    const lines = props.slots && props.slots.length ? props.paths.map(elem => {
        const fromStyle = props.styles.find(style => style.id === nodesList[elem.from_slot].style);
        const toStyle = props.styles.find(style => style.id === nodesList[elem.to_slot].style);
        const style = props.styles.find(style => style.id === elem.style);

        const from = {
            left: nodesList[elem.from_slot].x,
            top: nodesList[elem.from_slot].y,
            width: fromStyle.width,
            height: fromStyle.height,
        };
        const to = {
            left: nodesList[elem.to_slot].x,
            top: nodesList[elem.to_slot].y,
            width: toStyle.width,
            height: toStyle.height,
        };

        const points = computeLinePoints({ ...from, ...fromStyle }, { ...to, ...toStyle });
        const polygon = computePolygon({ ...from, ...fromStyle }, { ...to, ...toStyle });

        return createElement<PathProps>(Path, {
            points, polygon, key: elem.id, style,
            selected: props.selected && props.selected.id === elem.id,
            selectPath: () => props.selectPath(elem)
        });

    }) : [];

    return createElement('collection', { key: props.key }, lines);
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