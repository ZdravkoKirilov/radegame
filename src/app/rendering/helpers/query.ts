import { BaseObject } from "../interfaces";
import { BaseProps } from "../models";

export const getChildProps = (name: string, from: BaseObject): BaseProps | null => {
    return from.props.children.find(elem => elem.name === name) || null;
};

export const getFirstGraphic = <T>(root: BaseObject): T => {
    let graphic = root.__face__;
    if (!graphic) {
        return getFirstGraphic(Object.values(root.children)[0]);
    };
    return graphic;
};