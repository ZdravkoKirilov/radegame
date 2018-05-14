import { interaction, DisplayObject } from "pixi.js";
import { BaseObject } from "../interfaces";
import { factory, getChildProps } from "../helpers";

export type Interactive = BaseObject<DisplayObject> & {
    hoverElem: BaseObject<DisplayObject>;
};

export type InteractiveSettings = {
    hoverElem?: string;
};

export const interactive = (data: InteractiveSettings) => <T extends { new(...args: any[]): {} }>(constructor: T) => {
    const original = constructor;

    function construct(constructor, args) {
        const decorated: any = function () {
            return constructor.apply(this, args);
        }
        decorated.prototype = constructor.prototype;
        return new decorated();
    }

    const newConstructor: any = function (...args) {
        const instance: Interactive = construct(original, args);
        instance.face.interactive = true;
        instance.face.buttonMode = true;

        instance.face
            .on('mouseover', onHover(instance, data))
            .on('mouseout', onHoverOut(instance));

        return instance;
    }

    newConstructor.prototype = original.prototype;

    return newConstructor;
};

const onHover = (obj: Interactive, data: InteractiveSettings) => (event: interaction.InteractionEvent) => {
    const childProps = getChildProps(data.hoverElem, obj);
    if (childProps) {
        obj.hoverElem = factory(childProps, obj);
        obj.hoverElem.render(obj.container);
    }
};

const onHoverOut = (obj: Interactive) => (event: interaction.InteractionEvent) => {
    if (obj.hoverElem) {
        obj.hoverElem.remove();
        obj.hoverElem = null;
    }
};