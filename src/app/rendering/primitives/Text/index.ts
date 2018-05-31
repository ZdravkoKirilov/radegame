import { Text, TextStyle } from "pixi.js";

import { Component } from "../../interfaces";
import { BaseProps } from "../../models";
import { BasicComponent } from "../../mixins";

export class PixiText extends BasicComponent {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, stroke: '#ffffff', fill: ['#ffffff'], align: 'center', strokeThickness: 1,
    };

    graphic: Text;
    style: TextStyle;

    constructor(props: BaseProps, parent?: Component) {
        const style = new TextStyle({ ...PixiText.defaultTextStyle, ...(props.textStyle || {}), });
        super(props, new Text(props.value, style), parent);
    }
}