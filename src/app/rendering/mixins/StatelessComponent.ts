import { DisplayObject } from "pixi.js";

import { BasicComponent } from "./BasicComponent";
import { BaseProps } from "../models";
import { Component } from "../interfaces";

export class StatelessComponent<P extends BaseProps> extends BasicComponent {
    stateless = true;
    basic = false;
    template: string;

    constructor(props: P, parent: Component, template: string) {
        super(props, null, parent);
        this.template = template;
    }
    render(): string {
        if (!this.template) {
            throw new Error('Stateless component must have a template.');
        }
        return this.template;
    }

    update() {
        
    }
}