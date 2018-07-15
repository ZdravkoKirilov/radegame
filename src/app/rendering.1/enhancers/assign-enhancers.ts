import { DisplayObject } from "pixi.js-legacy";

import { Component } from "../interfaces";
import { makeDraggable } from "./draggable";

export const assignEnhancers = (comp: Component, graphic: DisplayObject) => {
    Object.keys(comp.props).forEach((key: string) => {
        if (supported.has(key)) {
            enhancers[key](comp, graphic);
        }
    });
};

const enhancers = {
    draggable: makeDraggable
};

const supported = new Set(Object.keys(enhancers));