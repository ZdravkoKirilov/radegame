import { Container } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { DisplayComponent } from "../DisplayComponent";

export class PixiContainer extends DisplayComponent<BaseProps, any> {

    __face__: Container;

    constructor(props: BaseProps, face: Container, parent?: BaseObject) {
        super(props, face, parent);
    }

    render() {
        return null;
    }
}