import { CompositeComponent, Component, Mounter } from "../interfaces";
import { parse } from "./parser";
import { BaseProps } from "../models";
import { toIndexedList } from "@app/shared";

export const patch = (elem: CompositeComponent) => {

    const newProps = parse({
        source: elem.render(),
        context: elem,
    });

    elem.children = patchChildren(elem, newProps);
    elem.setProps(newProps);
};

const patchChildren = (elem: Component, newProps: BaseProps): Array<Component> => {
    const result = [];
    const oldChildren = elem.props.children.map(props => props.name);
    const newChildren = newProps.children.map(props => props.name);
    const childProps = toIndexedList(newProps.children, 'name');
    const childrenList = toIndexedList(elem.children, 'props.name');

    return result;
};

const removeChildren = (children: Component[], newChildren: Array<string>): Array<Component> => {
    return children.filter(child => {
        if (newChildren.indexOf(child.props.name) !== -1) {
            return true;
        }
        child.remove();
        return false;
    });
};

const upsertChildren = (children: { [key: string]: Component }, newProps: BaseProps[], mount: Mounter): Array<Component> => {
    const result = [];

    newProps.forEach(props => {
        if (props.name in children) {
            children[props.name].setProps(props);
        } else {

        }
    });

    return result;
};
