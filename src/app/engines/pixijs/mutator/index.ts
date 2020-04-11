import { Graphics, Point, Polygon, Rectangle, Sprite, Circle, Ellipse, TextStyle, Text, Container, DisplayObject } from "pixi.js";
import { get } from 'lodash';

import { setProp, getValue, applyTransformations, applyTextTransformations } from "../helpers";
import {
    AbstractMutator,
    RzElementPrimitiveProps, PRIMS, Points,
    updateCollection, updateContainer, BasicComponent,
    PrimitiveText, PrimitiveSprite, PrimitiveFragment, PrimitiveCircle, RzStyles,
    PrimitiveEllipse, LineProps, unmountComponent,
} from "@app/render-kit";
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

const updatePrimitive = (component: BasicComponent<any>) => {
    const { graphic, type } = component;
    let { props } = component;
    const styles = applyTransformations(props.styles) as Required<RzStyles>;
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
            updateCircle(component, styles);
            updateContainer(props, component);
            break;
        case PRIMS.ellipse:
            updateEllipse(component, styles);
            updateContainer(props, component);
            break;
        default:
            updateGeneric(component);
            break;
    }

    if (component.graphic) {
        component.graphic.interactive = true;
    }
    applyZOrder(component);
};

const applyZOrder = (comp: BasicComponent) => {
    const { graphic } = comp;
    let { props } = comp;
    const zOrder = get(props, ['styles', 'z_order']);

    if (graphic && Number(zOrder)) {
        graphic.zOrder = Number(zOrder);
    }
}

const updateGeneric = (comp: BasicComponent) => {
    const graphic: DisplayObject = comp.graphic;
    let { props } = comp;
    const styles = props.styles || {};

    if (graphic && props.name) {
        graphic.name = props.name;
    }

    if (styles.width && styles.height) {
        // todo: should support other shapes than rectangle as well
        if (styles.scale) {
            const scale = styles.scale.split(' ').map(Number);
            const width = styles.width * (1 / scale[0]);
            const height = styles.height * (1 / scale[1]);
            graphic.hitArea = new Rectangle(styles.x || 0, styles.y || 0, width, height);
        } else {
            graphic.hitArea = new Rectangle(styles.x || 0, styles.y || 0, styles.width, styles.height);
        }
    }

    applyZOrder(comp);

    if (graphic && styles) {
        Object.keys(styles).forEach((key: keyof RzStyles) => {
            setProp(graphic, key, props.styles[key] as any);
        });
    }
};

const updateRectangle = (props: RzElementPrimitiveProps, graphic: Graphics) => {
    const { styles } = props;
    graphic.clear();

    if (props.styles.fill) {
        graphic.beginFill(props.styles.fill as number, styles.opacity || 1);
    }

    if (styles.stroke_color) {
        graphic.lineStyle(styles.stroke_thickness || 1, styles.stroke_color as number, styles.opacity || 1);
    }

    if (styles && !isNaN(Number(styles.border_radius))) {
        graphic.drawRoundedRect(styles.x, styles.y, styles.width, styles.height, styles.border_radius);
    } else {
        graphic.drawRect(styles.x, styles.y, styles.width, styles.height);
    }

    graphic.hitArea = new Rectangle(styles.x, styles.y, styles.width, styles.height);


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

export const updateText = (comp: PrimitiveText) => {
    const { props } = comp;
    const styleObject = comp.style as TextStyle;
    const graphic = comp.graphic as Text;
    const textStyle = props.textStyle || {};
    const remappedTextStyle = applyTextTransformations(textStyle);

    Object.keys(remappedTextStyle || {}).forEach(key => {
        const value = remappedTextStyle[key];
        const result = getValue(value as string, key as any, comp);
        styleObject[key] = result;
    });
    graphic.text = props.value;
};

const updateLine = (props: LineProps, line: Graphics) => {
    const points = [...props.points] as Points;
    const { styles } = props;
    const start = points.shift();
    const dash = props.dashGap || 0;

    line.clear();
    line.lineStyle(styles.stroke_thickness, styles.stroke_color as number, styles.opacity || 1);

    line.moveTo(start[0], start[1]);

    points.forEach((coord) => {
        const x = coord[0];
        const y = coord[1];
        line.lineTo(x, y);

        line.moveTo(x + dash, y + dash);
    });


    const polygon = new Polygon(points.map(elem => new Point(elem[0], elem[1])));
    line.hitArea = polygon;

};

const updatePolygon = (props: RzElementPrimitiveProps, graphic: Graphics) => {
    const points = [...props.points] as Points;
    const { styles } = props;

    graphic.clear();
    graphic.lineStyle(styles.stroke_thickness, styles.stroke_color as number, styles.opacity);

    const polygon = points.map(point => {
        return new Point(point[0], point[1]);
    });

    graphic.hitArea = new Polygon(polygon);


    graphic.drawPolygon(polygon);
};

const updateCircle = (comp: PrimitiveCircle, styles: RzStyles) => {
    const graphic: Graphics = comp.graphic;

    if (styles) {
        graphic.clear();
        graphic.lineStyle(styles.stroke_thickness, styles.stroke_color as number);
        graphic.pivot.set((styles.width) * -1, (styles.width) * -1);
        graphic.drawCircle(styles.x, styles.y, styles.width);

        graphic.hitArea = new Circle(styles.x, styles.y, styles.width);
    }
};

const updateEllipse = (comp: PrimitiveEllipse, styles: RzStyles) => {
    const graphic: Graphics = comp.graphic;

    if (styles) {
        graphic.clear();
        graphic.lineStyle(styles.stroke_thickness, styles.stroke_color as number, styles.opacity || 1);
        graphic.pivot.set((styles.width) * -1, (styles.width) * -1);
        graphic.drawEllipse(styles.x, styles.y, styles.width, styles.height);

        graphic.hitArea = new Ellipse(styles.x, styles.y, styles.width, styles.height);

    }
};


