import { Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";

export class DisplayComponent implements BaseObject {
    face: any = null;
    container: Container = null;
    readonly parent: BaseObject;
    public _props: BaseProps;
    public children: {
        [key: string]: BaseObject;
    }

    setProps(newProps: BaseProps) {
        this.props = newProps;
    }

    set props(data: BaseProps) {
        const current = this.props || {} as BaseProps;
        this._props = { ...current, ...data };
        this.update(data, current);
    }

    get props(): BaseProps {
        return this._props;
    }

    constructor(props: BaseProps, parent?: BaseObject) {
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