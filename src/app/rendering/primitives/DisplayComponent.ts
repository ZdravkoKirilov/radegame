import { Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";
import { update } from "../helpers";

export class DisplayComponent<P extends BaseProps, S> implements Partial<BaseObject> {
    readonly __face__: any = null;
    readonly __parent__: BaseObject;
    protected __props__: P;
    protected __state__: S;
    public stateless = false;
    public __children__: {
        [key: string]: BaseObject;
    }

    get props() {
        return this.__props__;
    }

    get state() {
        return this.__state__;
    }

    constructor(props: P, face?: any, parent?: BaseObject) {
        this.__parent__ = parent;
        this.__face__ = face;
        this.__state__ = null;
        this.__children__ = {};
        this.setProps(props);
    }

    render() {
        return null;
    }

    setProps(newProps: any) {
        const current = this.props || {} as any;
        this.__props__ = { ...current, ...newProps };
        if (this.shouldUpdate(newProps, current)) {
            DisplayComponent.update(this, newProps, current);
        }
    }

    setState(newState: any) {
        const current = this.state || {};
        this.__state__ = { ...current, ...newState };
        if (this.shouldUpdate(this.props, this.props, newState, current)) {
            DisplayComponent.update(this, this.props, this.props, newState, current);
        }
    }

    willReceiveProps(props: P) {
        return props;
    }

    willMount() { }
    didMount() { }
    willUnmount() { }
    willUpdate(props: any, state: any): any {
        return { ...props, ...state };
    }
    didUpdate() { }
    shouldUpdate(props?: P, prevProps?: P, state?: any, newState?: any): boolean {
        return true;
    }

    static update(target: BaseObject, props?: any, prevProps?: any, state?: any, newState?: any) {
        props = props || {};
        state = state || {};
        const merged = target.willUpdate(props, state);
        update(target);
        target.didUpdate();
    }

    remove() {
        this.__face__.destroy();
    }
};