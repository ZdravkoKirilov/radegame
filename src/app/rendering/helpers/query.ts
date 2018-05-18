import { BaseObject } from "../interfaces";
import { BaseElement } from "../models";

export const getChildProps = (name: string, from: BaseObject): BaseElement | null => {
    return from.props.children.find(elem => elem.name === name) || null;
};