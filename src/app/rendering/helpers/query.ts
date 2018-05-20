import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";

export const getChildProps = (name: string, from: BaseObject): BaseProps | null => {
    return from.props.children.find(elem => elem.name === name) || null;
};