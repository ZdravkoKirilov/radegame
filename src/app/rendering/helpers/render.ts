import { DisplayObject, Container } from "pixi.js";

import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";
import { factory } from "./factory";

export const mount = (props: BaseProps, container: Container, parent: BaseObject = null): void => {
    if (isPrimitive('pesho')) {
        mountPrimitive(props, container, parent);
    }
    if (isComposite) {
        mountComposite();
    }
    if (isStateless) {
        mountStateless();
    }
};

export const update = () => {

};

const updatePrimitive = () => {

};

const updateComposite = () => {

};

const updateStateless = () => {

};

const mountPrimitive = (props: BaseProps, container: Container, parent: BaseObject = null) => {
    const element = factory(props, parent);
    container.addChild(element.face);
    element.props.children.forEach(child => mount(child, element.face, element));
};

const mountComposite = () => {

};

const mountStateless = () => {

};

const isPrimitive = (type: string) => {

};

const isComposite = () => {

};

const isStateless = () => {

};