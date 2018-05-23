import { Text, TextStyle } from "pixi.js";

import { Component } from "../../interfaces";
import { BaseProps } from "../../models";
import { BasicComponent } from "../../mixins";

export class PixiText extends BasicComponent {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    };

    graphic: Text;
    style: TextStyle;

    constructor(props: BaseProps, parent?: Component) {
        const style = new TextStyle(props.textStyle || PixiText.defaultTextStyle);
        super(props, new Text(props.value, style), parent);
    }
}