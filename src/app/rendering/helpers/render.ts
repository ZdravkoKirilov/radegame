import { DisplayObject, Container, Application } from "pixi.js";

import { BaseObject } from "../interfaces";

export const render = (items: BaseObject<DisplayObject>[], container: Container | Application): void => {
    validate(container);

    const target = container instanceof Application ? container.stage : container;
    items.forEach(item => item.render(target));
};

function validate(container) {

    if (!(container instanceof Container || container instanceof Application)) {
        throw new Error('Invalid container: ' + container);
    }
}