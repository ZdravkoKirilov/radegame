import { Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseElement } from "../models";

export class DisplayComponent implements BaseObject {
    __face__: any = null;
    readonly parent: BaseObject;
    public __props__: BaseElement;
    public __children__: {
        [key: string]: BaseObject;
    }

    setProps(newProps: BaseElement) {
        this.props = newProps;
    }

    set props(data: BaseElement) {
        const current = this.props || {} as BaseElement;
        this.__props__ = { ...current, ...data };
        this.update(data, current);
    }

    get props(): BaseElement {
        return this.__props__;
    }

    constructor(props: BaseElement, face?: any, parent?: BaseObject) {
        this.parent = parent;
        this.props = props;
        this.__face__ = face;
    }

    render() {
        return '';
    }

    getContext(): any {
        return {};
    }

    update(props: BaseElement, prevProps?: BaseElement) {
        if (props) {
            Object.keys(props.mapped).forEach(key => {
                this.__face__[key] = props[key];
            });
        }
    }

    remove() {
        this.__face__.destroy();
    }
};