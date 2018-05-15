import { Text, Container, DisplayObject, TextStyle, TextStyleOptions } from "pixi.js";

import { BaseObject } from "../../interfaces";
import { BaseProps } from "../../models";

export class PixiText implements BaseObject<Text> {

    static defaultTextStyle = {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    };

    public face: Text;
    public container: Container;
    public textStyle: TextStyle;

    private _props: BaseProps;

    set props(data: BaseProps) {
        const current = this.props || {};
        if (data.textStyle !== this.props.textStyle) {
            this.textStyle = new TextStyle(data.textStyle || PixiText.defaultTextStyle);
        }
        this._props = { ...current, ...data };
        this.update(data);
    }

    get props(): BaseProps {
        return this._props;
    }

    constructor(public readonly parent: BaseObject<DisplayObject>, props: BaseProps) {
        this.textStyle = new TextStyle(props.textStyle || PixiText.defaultTextStyle);
        this.face = new Text(props.text, this.textStyle);
        this.props = props;
    }

    render(container: Container): void {
        this.container = container;
        container.addChild(this.face);
    }

    update(props: BaseProps): void {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.face[key] = props[key];
            });
        }
    }

    remove() {
        this.container.removeChild(this.face);
    }
}