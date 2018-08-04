import {
    AbstractMutator, Component, isComposite,
    RzElementProps, PRIMITIVE_TYPES, Points, updateComposite,
    updateCollection, updateContainer,
} from "@app/rendering";
import { DisplayObject, Graphics, Container } from "pixi.js";
import { BasicComponent } from "../../../mixins";

export class PixiMutator implements AbstractMutator {
    updateComponent(component: Component) {
        if (isComposite(component)) {
            updateComposite(component.render(), component);
        } else {
            updatePrimitive(component);
        }
    }

    removeComponent(component: Component) {
        const graphic: DisplayObject = component.graphic;
        graphic.parent.removeChild(graphic);
    }
}

const updateLine = (props: RzElementProps, line: Graphics) => {
    const points = [...props.points] as Points;
    const { styles } = props;
    const start = points.shift();
    line.clear();
    line.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);

    line.moveTo(start[0], start[1]);

    points.forEach((coord) => {
        line.lineTo(coord[0], coord[1]);
    });
};

const updatePrimitive = (component: BasicComponent) => {
    const { props, graphic } = component;

    switch (props.type) {
        case PRIMITIVE_TYPES.LINE:
            updateLine(props, graphic as Graphics);
            break;
        case PRIMITIVE_TYPES.CONTAINER:
            updateGeneric(props, graphic as Container);
            updateContainer(props, component);
            break;
        case PRIMITIVE_TYPES.COLLECTION:
            debugger;
            updateGeneric(props, graphic as Container);
            updateCollection(props, component);
            break;
        case PRIMITIVE_TYPES.FRAGMENT:
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
