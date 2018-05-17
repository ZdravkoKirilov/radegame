import { Text, Container, DisplayObject, TextStyle, TextStyleOptions } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { DisplayComponent } from "../DisplayComponent";

export class PixiText extends DisplayComponent {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    };

    public face: Text;
    public textStyle: TextStyle;
    public _props: BaseProps;

    set props(data: BaseProps) {
        const current = this.props || {};
        if (data.textStyle !== this.props.textStyle) {
            this.textStyle = new TextStyle(data.textStyle || PixiText.defaultTextStyle);
        }
        this._props = { ...current, ...data };
        this.update(data);
    }

    constructor(parent: BaseObject<DisplayObject>, props: BaseProps) {
        super(parent, props);
        this.textStyle = new TextStyle(props.textStyle || PixiText.defaultTextStyle);
        this.face = new Text(props.text, this.textStyle);
    }
}