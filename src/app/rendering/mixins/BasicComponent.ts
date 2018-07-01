import { Container } from "pixi.js";

import { assignEvents, EventPayload } from "../helpers";
import { EventEmitter } from '@app/shared';
import { BaseProps, MetaProps } from "../models";
import { Component } from "../interfaces";
import { assignEnhancers } from "../enhancers";

export class BasicComponent {
    basic = true;
    change: EventEmitter<EventPayload> = new EventEmitter();
    meta: MetaProps;
    props: BaseProps;
    graphic: any;
    container: any;
    parent: Component;
    children: Array<Component> = [];
    firstChild: Component;

    update() {
        this.meta.patcher(this);
    }

    get width() {
        return (this.graphic as any).width;
    }

    get height() {
        return (this.graphic as any).height;
    }

    get x() {
        return (this.graphic as any).x;
    }

    get y() {
        return (this.graphic as any).y;
    }

    constructor(props: BaseProps, graphic: any) {
        this.graphic = graphic;
        this.props = props;
        assignEvents(this, graphic);
        assignEnhancers(this, graphic);
    }

    render(container: Container): void {
        this.container = container;
        this.container.addChild(this.graphic);
    }

    setProps(props: Partial<BaseProps> | any) {
        const current = this.props || {};
        this.props = { ...current, ...props };
        if (this.shouldUpdate(props)) {
            this.update();
        }
    }

    shouldUpdate(nextProps: BaseProps, nextState = null): boolean {
        return true;
    }

    remove() {
        this.graphic.destroy();
    }
}