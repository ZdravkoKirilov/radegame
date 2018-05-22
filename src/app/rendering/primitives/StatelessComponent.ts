import { Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";
import { update, EventEmitter } from "../helpers";

export class StatelessComponent implements Partial<BaseObject> {
    state = null;
    shouldUpdate = null;
    willReceiveProps = null;
    willMount = null;
    didMount = null;
    willUnmount = null;
    willUpdate = null;
    didUpdate = null;
    setState = null;

    readonly change: EventEmitter<BaseProps> = new EventEmitter();
    readonly __face__: any = null;
    readonly __parent__: BaseObject;
    protected __props__: BaseProps;
    public __container__: any;
    public template: string;
    public stateless = true;
    public __children__: {
        [key: string]: BaseObject;
    }

    get container() {
        return this.__container__;
    }

    get children() {
        return this.__children__;
    }

    get props() {
        return this.__props__;
    }

    constructor(props: BaseProps, template: string, face?: any, parent?: BaseObject) {
        this.__parent__ = parent;
        this.__face__ = face;
        this.__children__ = {};
        this.template = template;
        this.setProps(props);
    }

    render() {
        return this.template;
    }

    setProps(newProps: any) {
        const current = this.props || {} as any;
        this.__props__ = { ...current, ...newProps };
        StatelessComponent.update(this, newProps, current);
    }

    static update(target: BaseObject, props?: any, prevProps?: any) {
        props = props || {};
        update(target, props);
    }

    remove() {
        this.__face__.destroy();
    }
}