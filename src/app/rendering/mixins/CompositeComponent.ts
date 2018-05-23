import { DisplayObject } from "pixi.js";

import { BasicComponent } from "./BasicComponent";
import { BaseProps } from "../models";
import { Component } from "../interfaces";

export class CompositeComponent<P extends BaseProps, S> extends BasicComponent {
    state: S;
    props: P;

    constructor(props: P, parent: Component) {
        super(props, null, parent);
    }

    setState(state: S) {
        this.state = { ...this.state || {}, ...state || {} } as S;
        if (this.shouldUpdate(this.props, state)) {
            this.update(this.props, this.state);
        }
    }

    setProps(props: P | any) {
        const current = this.props || {};
        this.props = { ...current, ...props };
        if (this.shouldUpdate(props, this.state)) {
            this.update(this.props, this.state);
        }
    }

    shouldUpdate(nextProps: P, nextState: S) {
        return true;
    }

    update(nextProps: P, nextState: S) {
        Object.keys(nextProps).forEach(key => {
            this.graphic[key] = nextProps[key];
        });
    }

    render(): string {
        throw new Error('Render not implemented!');
    }

    willReceiveProps(props: P) {
        return props;
    }

    willMount() { }
    didMount() { }
    willUnmount() { }
    didUpdate() { }
}