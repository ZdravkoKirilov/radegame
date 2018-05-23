import { DisplayObject, Container } from "pixi.js";

import { EventEmitter, assignEvents } from "../helpers";
import { BaseProps } from "../models";
import { Component } from "../interfaces";

export class BasicComponent {
    change: EventEmitter<BaseProps> = new EventEmitter();
    props: BaseProps;
    graphic: DisplayObject;
    container: Container;
    parent: Component;
    children: Array<Component>;

    constructor(props: BaseProps, graphic: DisplayObject, parent: Component) {
        this.parent = parent;
        this.graphic = graphic;
        assignEvents(props, graphic);
        this.setProps(props);
    }

    render(container: Container): void {
        this.container = container;
        this.container.addChild(this.graphic);
    }

    setProps(props: BaseProps) {
        const current = this.props || {};
        this.props = { ...current, ...props };
        if (this.shouldUpdate(props)) {
            this.update(this.props);
        }
    }

    shouldUpdate(nextProps: BaseProps, nextState = null): boolean {
        return true;
    }

    update(nextProps: BaseProps, nextState = null) {
        Object.keys(nextProps).forEach(key => {
            this.graphic[key] = nextProps[key];
        });
    }

    remove() {
        this.graphic.destroy();
    }
}