import { DisplayObject, Container } from "pixi.js";

import { EventEmitter, assignEvents, EventPayload } from "../helpers";
import { BaseProps, MetaProps } from "../models";
import { Component } from "../interfaces";
import { assignEnhancers } from "../enhancers";

export class BasicComponent {
    basic = true;
    change: EventEmitter<EventPayload> = new EventEmitter();
    meta: MetaProps;
    props: BaseProps;
    graphic: DisplayObject;
    container: Container;
    parent: Component;
    children: Array<Component>;
    firstChild: Component;

    get parentGraphic() {
        return this.graphic.parent;
    }

    get width() {
        return (this.graphic as any).width;
    }

    get height() {
        return (this.graphic as any).height;
    }

    constructor(props: BaseProps, graphic: DisplayObject, parent: Component) {
        this.parent = parent;
        this.graphic = graphic;
        this.setProps(props);
        assignEvents(this, graphic);
        assignEnhancers(this, graphic);
    }

    render(container: Container): void {
        this.container = container;
        this.container.addChild(this.graphic);
        this.update(this.props);
    }

    setProps(props: Partial<BaseProps> | any) {
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

        Object.keys(nextProps.mapped || {}).forEach(key => {
            this.graphic[key] = nextProps.mapped[key];
        });
    }

    remove() {
        this.graphic.destroy();
    }
}