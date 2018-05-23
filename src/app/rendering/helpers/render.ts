import { Container, DisplayObject } from "pixi.js";

import { BaseProps } from "../models";
import { factory, Factory } from "./factory";
import { PRIMITIVE_TYPES } from "../config";
import { parse } from "./parser";
import { StatelessComponent, BasicComponent, CompositeComponent } from '../mixins';
import { Component } from "../interfaces";

export const createRenderer =
    (compositeFactory: Factory) =>
        (props: BaseProps, container: Container, parent: Component = null) =>
            mount(props, container, parent, compositeFactory);

const mount = (props: BaseProps, container: Container, parent: Component = null, compositeFactory: Factory = null): Component => {

    if (isPrimitive(props.type)) {
        return mountPrimitive(props, container, parent);
    }

    if (isComposite(props) && compositeFactory) {
        return mountComposite(props, container, parent, compositeFactory);
    }
    return null;
};

const mountPrimitive = (props: BaseProps, container: Container, parent: Component = null): Component => {
    const element: BasicComponent = factory(props, parent);
    element.render(container);
    return element;
};

const mountComposite = (props: BaseProps, container: Container, parent: Component = null, compositeFactory: Factory): Component => {

    if (isStateless(props, compositeFactory)) {
        const stateless = mountStateless(props, container, parent, compositeFactory);
        return stateless;
    } else {
        const element = compositeFactory(props, parent) as CompositeComponent<typeof props, any>;
        const template = element.render();
        // here can replace <children> reserver node with props.children?
        const parsed = parse({ source: template, context: element });
        element.willMount();
        mount(parsed, container, parent);
        element.didMount();
        return element;
    }
};

const mountStateless = (props: BaseProps, container: Container, parent: Component = null, compositeFactory: Factory): Component => {
    const element = compositeFactory(props) as StatelessComponent<typeof props>;
    mount(element.props, container, parent);
    return element;
};

// const mountChildren = (element: Component): { [key: string]: Component } => {
//     return element.props.children.reduce((total, child) => {
//         total[child.name] = mount(child, element.__face__, element);
//         return total;
//     }, {});
// };

// export const update = (elem: Component, newData: BaseProps) => {
//     if (isPrimitive(elem.props.type)) {
//         const graphic = elem.__face__ as DisplayObject;
//         Object.keys(newData.mapped).forEach(key => {
//             graphic[key] = newData[key];
//         });
//     }
//     updateChildren(elem, newData);
// };

// const updateChildren = (elem: Component, newData: BaseProps) => {
//     const currentChildren = new Set(Object.values(elem.children));
//     const currentChildrenNames = new Set(Object.keys(elem.children));

//     const newChildren = new Set(newData.children);
//     const newChildrenNames = new Set(newData.children.map(child => child.name));

//     currentChildren.forEach(child => {
//         if (!newChildrenNames.has(child.props.name)) {
//             child.remove();
//         }
//     });
//     newChildren.forEach((child: BaseProps) => {
//         if (currentChildrenNames.has(child.name)) {
//             currentChildren.forEach(elem => {
//                 if (elem.props.name === child.name) {
//                     elem.setProps(child);
//                 }
//             });
//         } else {
//             mount(child, elem.__face__, elem, null);
//         }
//     });
// };

const isPrimitive = (type: string) => {
    return type in PRIMITIVE_TYPES;
};

const isComposite = (props: BaseProps): boolean => {
    return !isPrimitive(props.type);
};

const isStateless = (props: BaseProps, compositeFactory: Factory): boolean => {
    const elem = compositeFactory(props);
    return elem instanceof StatelessComponent;
};