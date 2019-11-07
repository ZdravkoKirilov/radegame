import { createElement, Points, Memo } from "@app/render-kit";
import { PathEntity, Slot, Style } from "@app/game-mechanics";
import { Dictionary } from "@app/shared";

import Path, { Props as PathProps } from './node';

export type Props = {
    paths: PathEntity[];
    slots: Dictionary<Slot>;
    styles: Dictionary<Style>;
    selected: PathEntity;
    selectPath: (item: PathEntity) => void;
}

export const PathsList = Memo<Props>(
    (props, { useState, useEffect }) => {
        const nodesList = props.slots;
        // const [count, setCount] = useState(0);
        // useEffect(() => {
        //     setInterval(() => {
        //         setCount(count + 5)
        //     }, 2000)
        // }, []);
        // console.log(count);

        const lines = props.slots && props.slots.length ? props.paths.map(elem => {
            const fromStyle = props.styles[nodesList[elem.from_slot].style as number];
            const toStyle = props.styles[nodesList[elem.to_slot].style as number];
            const style = props.styles[elem.style as number];

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

        return createElement('collection', { key: props.key, name: 'paths' }, lines);
    },
    ['paths', 'slots', 'selected']
);

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
    ] as Points;

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
    ] as Points;

    return points;
};

export default PathsList;