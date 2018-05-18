import { interaction, DisplayObject } from "pixi.js";
import { BaseObject } from "../interfaces";
import { factory, getChildProps } from "../helpers";

export type Interactive = BaseObject & {
    hoverElem: BaseObject;
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
        instance.__face__.interactive = true;
        instance.__face__.buttonMode = true;

        instance.__face__
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
        
        
    }
};

const onHoverOut = (obj: Interactive) => (event: interaction.InteractionEvent) => {
    if (obj.hoverElem) {
        obj.hoverElem.remove();
        obj.hoverElem = null;
    }
};