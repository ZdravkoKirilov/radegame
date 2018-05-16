import { DisplayObject, Container, Application } from "pixi.js";

import { BaseObject } from "../interfaces";

export const render = (root: BaseObject<DisplayObject>, container: Container | Application): void => {

    validate(root, container);

    if (container instanceof Application) {
        root.render(container.stage);
    } else {
        root.render(container);
    }
};

function validate(root, container) {
    if (!(root instanceof BaseObject)) {
        throw new Error('Invalid BaseObject: ' + root);
    }
    if (!(container instanceof Container || container instanceof Application)) {
        throw new Error('Invalid container: ' + container);
    }
}