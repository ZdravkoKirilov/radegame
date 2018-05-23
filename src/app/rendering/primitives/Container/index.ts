import { Container } from "pixi.js";

import { BaseProps } from "../../models";
import { BasicComponent } from "../../mixins";
import { Component } from "../../interfaces";

export class PixiContainer extends BasicComponent {

    graphic: Container;

    constructor(props: BaseProps, parent?: Component) {
        super(props, new Container(), parent);
    }

}