import { Text, TextStyle } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";
import { DisplayComponent } from "../DisplayComponent";

export class PixiText extends DisplayComponent<BaseProps, any> {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    };

    public __face__: Text;
    public textStyle: TextStyle;

    constructor(props: BaseProps, face: Text, textStyle: TextStyle, parent?: BaseObject) {
        super(props, face, parent);
        this.textStyle = textStyle;
    }

    render() {
        return '';
    }
}