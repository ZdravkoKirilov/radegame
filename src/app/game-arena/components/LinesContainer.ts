import { StatefulComponent, createElement, Points } from "@app/rendering";
import { Path } from "./Path";
import { toIndexedList } from "@app/shared";

type Props = {
    lines: Array<any>;
    nodes: Array<any>;
}

type State = {
    selected: number;
};

export class LinesContainer extends StatefulComponent<Props, State> {
    state = {
        selected: -1,
    }
    render() {
        const nodesList = toIndexedList(this.props.nodes);
        const lines = this.props.lines.map(elem => {
            const from = {
                left: nodesList[elem.from].styles.x,
                top: nodesList[elem.from].styles.y,
                width: nodesList[elem.from].sprite.styles.width,
                height: nodesList[elem.from].sprite.styles.height
            }
            const to = {
                left: nodesList[elem.to].styles.x,
                top: nodesList[elem.to].styles.y,
                width: nodesList[elem.to].sprite.styles.width,
                height: nodesList[elem.to].sprite.styles.height
            }

            const points = computeLinePoints(from, to);
            const polygon = computePolygon(from, to);

            return createElement(Path,
                {
                    ...elem, points, polygon,
                    key: elem.id,
                    id: elem.id,
                    selected: elem.id === this.state.selected,
                    onSelect: this.handleLineSelection
                }
            );
        });

        return createElement('collection', null, lines);
    }

    handleLineSelection = (lineId: number) => {
        this.setState({
            selected: lineId
        });
    }
};

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