import {
    AbstractMutator, Component, isComposite,
    RzElementProps, PRIMS, Points, updateComposite,
    updateCollection, updateContainer, unmountComposite, BasicComponent,
    PrimitiveText, PrimitiveSprite, PrimitiveFragment, PrimitiveCircle, Styles,
    PrimitiveEllipse,
    PrimitiveShadow,
} from "@app/rendering";
import { Graphics, Point, Polygon, Rectangle, Sprite, Circle, Ellipse, DisplayObject } from "pixi.js";
import { DropShadowFilter } from 'pixi-filters';
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
        case PRIMS.shadow:
            unmountShadow(component as PrimitiveShadow);
            break;
        default:
            unmountGeneric(component);
            unmountChildren(component);
            break;

    }
};

const unmountShadow = (comp: PrimitiveShadow) => {
    if (comp.parent && comp.parent.graphic) {
        const target: DisplayObject = comp.parent.graphic;
        const shadow = comp.graphic;
        if (target.filters && target.filters.length) {
            target.filters = target.filters.filter(elem => elem !== shadow);
        }
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
            updateSprite(component as PrimitiveSprite);
            updateGeneric(component);
            break;
        case PRIMS.circle:
            updateCircle(component);
            updateContainer(props, component, component.container);
            break;
        case PRIMS.ellipse:
            updateEllipse(component);
            updateContainer(props, component, component.container);
            break;
        case PRIMS.shadow:
            updateShadow(component as PrimitiveShadow);
            break;
        default:
            updateGeneric(component);
            break;

    }
}

const updateGeneric = (comp: Component) => {
    const { props, graphic } = comp;
    const styles: Styles = props.styles;
    if (graphic && styles) {
        Object.keys(styles).forEach((key: keyof Styles) => {
            setProp(comp, key, props.styles[key]);
        });
    }
};

const updateShadow = (comp: PrimitiveShadow) => {

    if (comp.parent && comp.parent.graphic) {
        const target: DisplayObject = comp.parent.graphic;
        const filters = target.filters || [];
        const filter: DropShadowFilter = comp.graphic;

        filter.alpha = comp.props.alpha;
        filter.blur = comp.props.blur;
        filter.distance = comp.props.distance;
        filter.color = comp.props.color;

        const notAdded = !filters.find(elem => elem === filter);
        if (notAdded) {
            target.filters = [filter];
        }
    }
};

const updateRectangle = (props: RzElementProps, graphic: Graphics) => {
    const { styles } = props;

    graphic.clear();
    graphic.hitArea = new Rectangle(styles.x, styles.y, styles.width, styles.height);

    if (props.styles.fill) {
        graphic.beginFill(props.styles.fill);
    }

    graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha);

    if (styles && !isNaN(Number(styles.borderRadius))) {
        graphic.drawRoundedRect(styles.x, styles.y, styles.width, styles.height, styles.borderRadius);
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
        const result = getValue(value as string, key as any, comp);
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
        graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha || 1);
        graphic.pivot.set((styles.radius / 2) * -1, (styles.radius / 2) * -1);
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
        graphic.lineStyle(styles.strokeThickness, styles.strokeColor, styles.alpha || 1);
        graphic.pivot.set(-1 * styles.width / 2, -1 * styles.height / 2);
        graphic.drawEllipse(styles.x, styles.y, styles.width, styles.height);

        if (comp.props.button) {
            graphic.hitArea = new Ellipse(styles.x, styles.y, styles.width, styles.height);
            graphic.buttonMode = true;
            graphic.interactive = true;
        }
    }
};


