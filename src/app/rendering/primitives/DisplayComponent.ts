import { DisplayObject, Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";

export class DisplayComponent implements BaseObject<DisplayObject> {
    face: DisplayObject = null;
    container: Container = null;
    readonly parent: BaseObject<DisplayObject>;
    public _props: BaseProps;

    set props(data: BaseProps) {
        const current = this.props || {} as BaseProps;
        this._props = { ...current, ...data };
        this.update(data, current);
    }

    get props(): BaseProps {
        return this._props;
    }

    constructor(parent: BaseObject<DisplayObject>, props: BaseProps) {
        this.parent = parent;
        this.props = props;
    }

    render(container: Container) {
        this.container = container;
        container.addChild(this.face);
    }

    update(props: BaseProps, prevProps?: BaseProps) {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.face[key] = props[key];
            });
        }
    }

    remove() {
        this.face.destroy();
    }
};