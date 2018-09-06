import {
    AbstractMutator, Component, isComposite,
    RzElementProps, PRIMS, Points, updateComposite,
    updateCollection, updateContainer, unmountComposite, BasicComponent,
    PrimitiveText
} from "@app/rendering";
import { DisplayObject, Graphics, Point, Polygon, Rectangle } from "pixi.js";
import { setProp, getValue } from "../helpers";

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
            updateGeneric(component);
            updateContainer(props, component, component.container);
            break;
        case PRIMS.CONTAINER:
            updateGeneric(component);
            updateContainer(props, component, component.graphic);
            break;
        case PRIMS.COLLECTION:
            updateGeneric(component);
            updateCollection(props, component);
            break;
        case PRIMS.RECTANGLE:
            updateRectangle(props, component.graphic);
            updateContainer(props, component, component.container);
        case PRIMS.TEXT:
            updateGeneric(component);
            updateText(component as PrimitiveText);
        default:
            updateGeneric(component);
            break;

    }
}

const updateGeneric = (comp: Component) => {
    const { props } = comp;
    Object.keys(props.styles || {}).forEach(key => {
        setProp(comp, key, props.styles[key]);
    });
};

const updateRectangle = (props: RzElementProps, graphic: Graphics) => {
    const { styles } = props;

    graphic.clear();

    if (props.interactive) {
        graphic.interactive = true;
        graphic.buttonMode = true;
        graphic.hitArea = new Rectangle(styles.x, styles.y, styles.width, styles.height);
    }

    graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);
    graphic.drawRect(styles.x, styles.y, styles.width, styles.height);
};

const updateText = (comp: PrimitiveText) => {
    const { props } = comp;
    const textStyle = props.textStyle || {};
    Object.keys(textStyle || {}).forEach(key => {
        const value = textStyle[key];
        const result = getValue(value as string, key, comp);
        comp.style[key] = result;
    });
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


