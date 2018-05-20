import { Container } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { factory } from "../../helpers";
import { DisplayComponent } from "../DisplayComponent";

export class PixiCollection extends DisplayComponent<BaseProps, any> {

    public __face__: Container;

    constructor(props: BaseProps, face: Container, parent?: BaseObject) {
        super(props, face, parent);
    }

    render() {
        return null;
    }
}