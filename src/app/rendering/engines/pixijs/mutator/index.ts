import {
    AbstractMutator, Component, isComposite,
    RzElementProps, PRIMS, Points, updateComposite,
    updateCollection, updateContainer, unmountComposite, BasicComponent
} from "@app/rendering";
import { DisplayObject, Graphics, Container, Point, Polygon } from "pixi.js";


export class PixiMutator implements AbstractMutator {
    updateComponent(component: Component) {
        if (isComposite(component)) {
            const newProps = component.render();
            updateComposite(newProps, component);
        } else {
            updatePrimitive(component);
        }
    }

    removeComponent(component: Component) {
        if (isComposite(component)) {
            unmountComposite(component);
        } else {
            const graphic: DisplayObject = component.graphic;
            graphic.parent.removeChild(graphic);
        }
    }
}

const updatePrimitive = (component: BasicComponent) => {
    const { props, graphic, type } = component;
    switch (type) {
        case PRIMS.LINE:
            updateLine(props, graphic as Graphics);
            break;
        case PRIMS.POLYGON:
            updatePolygon(props, graphic as Graphics);
            break;
        case PRIMS.FRAGMENT:
            updateGeneric(props, graphic as Container);
            updateContainer(props, component);
            break;
        case PRIMS.CONTAINER:
            updateGeneric(props, graphic as Container);
            updateContainer(props, component);
            break;
        case PRIMS.COLLECTION:
            updateGeneric(props, graphic as Container);
            updateCollection(props, component);
            break;
        case PRIMS.FRAGMENT:
            updateContainer(props, component);
            break;
        default:
            updateGeneric(props, graphic);
            break;

    }
}

const updateGeneric = (props: RzElementProps, graphic: DisplayObject) => {
    Object.keys(props.styles || {}).forEach(key => {
        setProp(graphic, key, props.styles[key]);
    });
};

const setProp = (graphic: DisplayObject, prop: string, value: string | number) => {
    const result = value;
    graphic[prop] = result;
    return result;
};

const updateLine = (props: RzElementProps, line: Graphics) => {
    const points = [...props.points] as Points;
    const { styles, hitArea } = props;
    const start = points.shift();

    line.clear();
    line.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);

    line.moveTo(start[0], start[1]);

    points.forEach((coord) => {
        line.lineTo(coord[0], coord[1]);
    });

    if (props.interactive && hitArea) {
        line.buttonMode = true;
        line.interactive = true;
        const polygon = new Polygon(hitArea.map(elem => new Point(elem[0], elem[1])));
        line.hitArea = polygon;
    }
};

const updatePolygon = (props: RzElementProps, graphic: Graphics) => {
    const points = [...props.points] as Points;
    const { styles } = props;

    graphic.clear();
    graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);

    const polygon = points.map(point => {
        return new Point(point[0], point[1]);
    });

    if (props.interactive) {
        graphic.hitArea = new Polygon(props.hitArea || polygon);
    }

    graphic.moveTo(0, 0);
    graphic.drawPolygon(polygon);
};
