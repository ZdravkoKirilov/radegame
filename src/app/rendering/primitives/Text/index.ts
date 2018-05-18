import { Text, TextStyle } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseElement } from "../../models";
import { DisplayComponent } from "../DisplayComponent";

export class PixiText extends DisplayComponent {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    };

    public __face__: Text;
    public __props__: BaseElement;
    public textStyle: TextStyle;

    set props(data: BaseElement) {
        const current = this.props || {};
        if (data.textStyle !== this.props.textStyle) {
            this.textStyle = new TextStyle(data.textStyle || PixiText.defaultTextStyle);
        }
        this.__props__ = { ...current, ...data };
        this.update(data);
    }

    constructor(props: BaseElement, face: Text, textStyle: TextStyle, parent?: BaseObject) {
        super(props, face, parent);
        this.textStyle = textStyle;
    }

    render() {
        return '';
    }
}