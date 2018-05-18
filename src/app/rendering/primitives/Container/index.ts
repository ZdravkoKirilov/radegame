import { Container } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseElement } from "../../models";
import { DisplayComponent } from "../DisplayComponent";

export class PixiContainer extends DisplayComponent {

    public __face__: Container;
    public __props__: BaseElement;

    constructor(props: BaseElement, face: Container, parent?: BaseObject) {
        super(props, face, parent);
    }

    render() {
        return '';
    }


    update(props: BaseElement, prevProps: BaseElement): void {

    }
}