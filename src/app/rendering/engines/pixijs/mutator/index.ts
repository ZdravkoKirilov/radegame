import {
    AbstractMutator, Component, isComposite,
    RzElementProps, PRIMS, Points, updateComposite,
    updateCollection, updateContainer, unmountComposite, BasicComponent,
    PrimitiveText, PrimitiveSprite, PrimitiveFragment,
} from "@app/rendering";
import { Graphics, Point, Polygon, Rectangle, Sprite, Circle } from "pixi.js";
import { setProp, getValue } from "../helpers";
import { PrimitiveCircle } from "app/rendering/primitives";

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
            unmountPrimitive(component);
        }
    }

    getProp(component: Component, prop: string) {
        const { graphic } = component;
        return graphic[prop];
    }
}

const unmountPrimitive = (component: BasicComponent) => {
    const { type } = component;

    switch (type) {
        case PRIMS.fragment:
            unmountChildren(component);
            break;
        default:
            unmountGeneric(component);
            unmountChildren(component);
            break;

    }
};

const unmountGeneric = (component: BasicComponent) => {
    const { graphic } = component;

    if (graphic) {
        graphic.parent && graphic.parent.removeChild(graphic);
    }
};

const unmountChildren = (component: PrimitiveFragment): void => {
    component.children.forEach(child => child.remove());
};

const updatePrimitive = (component: BasicComponent) => {
    const { props, graphic, type } = component;

    switch (type) {
        case PRIMS.line:
            updateLine(props, graphic as Graphics);
            break;
        case PRIMS.polygon:
            updatePolygon(props, graphic as Graphics);
            break;
        case PRIMS.fragment:
            updateGeneric(component);
            updateContainer(props, component, component.container);
            break;
        case PRIMS.container:
            updateGeneric(component);
            updateContainer(props, component, component.graphic);
            break;
        case PRIMS.collection:
            updateGeneric(component);
            updateCollection(props, component);
            break;
        case PRIMS.rectangle:
            updateRectangle(props, component.graphic);
            updateContainer(props, component, component.container);
            break;
        case PRIMS.text:
            updateGeneric(component);
            updateText(component as PrimitiveText);
            break;
        case PRIMS.sprite:
            updateSprite(component);
            updateGeneric(component);
            break;
        case PRIMS.circle:
            updateCircle(component);
            updateContainer(props, component, component.container);
        default:
            updateGeneric(component);
            break;

    }
}

const updateGeneric = (comp: Component) => {
    const { props } = comp;
    if (comp.graphic) {
        Object.keys(props.styles || {}).forEach(key => {
            setProp(comp, key, props.styles[key]);
        });
    }
};

const updateRectangle = (props: RzElementProps, graphic: Graphics) => {
    const { styles } = props;

    graphic.clear();
    graphic.hitArea = new Rectangle(styles.x, styles.y, styles.width, styles.height);

    graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);

    if (styles && !isNaN(Number(styles.radius))) {
        graphic.drawRoundedRect(styles.x, styles.y, styles.width, styles.height, styles.radius);
    } else {
        graphic.drawRect(styles.x, styles.y, styles.width, styles.height);
    }

};

const updateSprite = (comp: PrimitiveSprite) => {

    const { props, graphic, container, meta } = comp;
    const assetManager = meta.assets;
    const image = assetManager.getTexture(props.image);

    if (image) {
        const newGraphic = new Sprite(image);
        comp.graphic = newGraphic;
        if (graphic) {
            const index = container.getChildIndex(graphic);
            container.addChildAt(newGraphic, index);
            container.removeChild(graphic);
        } else {
            container.addChild(newGraphic);
        }
    }
}

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

    if (hitArea) {
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

    if (props.hitArea) {
        graphic.hitArea = new Polygon(props.hitArea || polygon);
    }

    graphic.moveTo(0, 0);
    graphic.drawPolygon(polygon);
};

const updateCircle = (comp: PrimitiveCircle) => {
    const graphic: Graphics = comp.graphic;
    const { styles } = comp.props;

    if (styles) {
        graphic.clear();
        graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha || 1);
        graphic.drawCircle(styles.x, styles.y, styles.radius);

        if (comp.props.button) {
            graphic.hitArea = new Circle(styles.x, styles.y, styles.radius);
            graphic.buttonMode = true;
            graphic.interactive = true;
        }
    }
};


