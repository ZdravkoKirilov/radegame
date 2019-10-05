import {
    AbstractMutator,
    RzElementProps, PRIMS, Points,
    updateCollection, updateContainer, BasicComponent,
    PrimitiveText, PrimitiveSprite, PrimitiveFragment, PrimitiveCircle, RzStyles,
    PrimitiveEllipse,
    LineProps,
    unmountComponent,
    applyTransformations,
} from "@app/render-kit";
import { Graphics, Point, Polygon, Rectangle, Sprite, Circle, Ellipse, TextStyle, Text } from "pixi.js";
import { setProp, getValue } from "../helpers";

export class PixiMutator implements AbstractMutator {
    updateComponent(component: BasicComponent) {
        updatePrimitive(component);
    }

    removeComponent(component: BasicComponent) {
        unmountPrimitive(component);
    }

    getProp(component: BasicComponent, prop: string) {
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
    component.children.forEach(child => unmountComponent(child));
};

const updatePrimitive = (component: BasicComponent) => {
    const { graphic, type } = component;
    let { props } = component;
    const styles = applyTransformations(props.styles);
    props = { ...props, styles };

    switch (type) {
        case PRIMS.line:
            updateLine(props as LineProps, graphic as Graphics);
            break;
        case PRIMS.polygon:
            updatePolygon(props, graphic as Graphics);
            break;
        case PRIMS.fragment:
            updateGeneric(component);
            updateContainer(props, component);
            break;
        case PRIMS.container:
            updateGeneric(component);
            updateContainer(props, component);
            break;
        case PRIMS.collection:
            updateGeneric(component);
            updateCollection(props, component);
            break;
        case PRIMS.rectangle:
            updateRectangle(props, component.graphic);
            updateContainer(props, component);
            break;
        case PRIMS.text:
            updateGeneric(component);
            updateText(component as PrimitiveText);
            break;
        case PRIMS.sprite:
            updateSprite(component as PrimitiveSprite);
            updateGeneric(component);
            break;
        case PRIMS.circle:
            updateCircle(component);
            updateContainer(props, component);
            break;
        case PRIMS.ellipse:
            updateEllipse(component);
            updateContainer(props, component);
            break;
        default:
            updateGeneric(component);
            break;

    }
}

const updateGeneric = (comp: BasicComponent) => {
    const { graphic } = comp;
    let { props } = comp;
    const styles = applyTransformations(props.styles);
    props = { ...props, styles };

    if (graphic && props.name) {
        graphic.name = props.name;
    }
    if (graphic && styles) {
        Object.keys(styles).forEach((key: keyof RzStyles) => {
            setProp(comp, key, props.styles[key]);
        });
    }
};

const updateRectangle = (props: RzElementProps, graphic: Graphics) => {
    const { styles } = props;

    graphic.clear();
    graphic.hitArea = new Rectangle(styles.x, styles.y, styles.width, styles.height);

    if (props.styles.fill) {
        graphic.beginFill(props.styles.fill);
    }

    graphic.lineStyle(styles.stroke_thickness, styles.stroke_color, styles.alpha || 1);

    if (styles && !isNaN(Number(styles.borderRadius))) {
        graphic.drawRoundedRect(styles.x, styles.y, styles.width, styles.height, styles.borderRadius);
    } else {
        graphic.drawRect(styles.x, styles.y, styles.width, styles.height);
    }

    // const maskElem = new Graphics().drawRect(styles.x, styles.y, styles.width / 2, styles.height / 2);

    // graphic.mask = maskElem;

};

const updateSprite = (comp: PrimitiveSprite) => {
    const { props, graphic, container, meta } = comp;
    const assetManager = meta.assets;
    const image = assetManager.getTexture(props.image);

    if (image) {
        const newGraphic = new Sprite(image);
        comp.graphic = newGraphic;
        const isMounted = container.children.indexOf(graphic) !== -1;
        if (graphic && isMounted) {
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
    const styleObject = comp.style as TextStyle;
    const graphic = comp.graphic as Text;
    const textStyle = props.textStyle || {};
    Object.keys(textStyle || {}).forEach(key => {
        const value = textStyle[key];
        const result = getValue(value as string, key as any, comp);
        styleObject[key] = result;
    });
    graphic.text = props.value;
};

const updateLine = (props: LineProps, line: Graphics) => {
    const points = [...props.points] as Points;
    const { styles, hitArea } = props;
    const start = points.shift();
    const dash = props.dashGap || 0;

    line.clear();
    line.lineStyle(styles.stroke_thickness, styles.stroke_color, styles.alpha);

    line.moveTo(start[0], start[1]);

    points.forEach((coord) => {
        const x = coord[0];
        const y = coord[1];
        line.lineTo(x, y);

        line.moveTo(x + dash, y + dash);
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
    graphic.lineStyle(styles.stroke_thickness, styles.stroke_color, styles.alpha);

    const polygon = points.map(point => {
        return new Point(point[0], point[1]);
    });

    if (props.button) {
        graphic.hitArea = new Polygon(polygon);
        graphic.buttonMode = true;
        graphic.interactive = true;
    }

    graphic.drawPolygon(polygon);
};

const updateCircle = (comp: PrimitiveCircle) => {
    const graphic: Graphics = comp.graphic;
    const { styles } = comp.props;

    if (styles) {
        graphic.clear();
        graphic.lineStyle(styles.stroke_thickness, styles.stroke_color, styles.alpha || 1);
        graphic.pivot.set((styles.radius) * -1, (styles.radius) * -1);
        graphic.drawCircle(styles.x, styles.y, styles.radius);

        if (comp.props.button) {
            graphic.hitArea = new Circle(styles.x, styles.y, styles.radius);
            graphic.buttonMode = true;
            graphic.interactive = true;
        }
    }
};

const updateEllipse = (comp: PrimitiveEllipse) => {
    const graphic: Graphics = comp.graphic;
    const { styles } = comp.props;

    if (styles) {
        graphic.clear();
        graphic.lineStyle(styles.stroke_thickness, styles.stroke_color, styles.alpha || 1);
        graphic.pivot.set(-1 * styles.width / 2, -1 * styles.height / 2);
        graphic.drawEllipse(styles.x, styles.y, styles.width, styles.height);

        if (comp.props.button) {
            graphic.hitArea = new Ellipse(styles.x, styles.y, styles.width, styles.height);
            graphic.buttonMode = true;
            graphic.interactive = true;
        }
    }
};


