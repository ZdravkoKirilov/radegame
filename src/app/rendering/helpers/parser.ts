import { BaseProps } from "../models";

export const parseFromXML = (source: string): Document | null => {
    const parser = new DOMParser();
    const result = parser.parseFromString(source, 'application/xml');
    if (result.querySelector('parseerror')) {
        return null;
    } else {
        return result;
    }
};

export const parseFromDocumentTree = <T>(source: Document, context: T): BaseProps[] => {
    const elements = Array.from(source.children);
    return elements.map(elem => parseElement<T>(elem, context));
};

export const parseElement = <T>(elem: Element, context: T): BaseProps => {
    const children = Array.from(elem.children).map(child => parseElement(child, context));
    return {
        children
    } as BaseProps;
};

export const parse = <T>(source: string, context: T): BaseProps[] => {
    const asDoc = parseFromXML(source);
    let result = [];
    if (asDoc) {
        result = parseFromDocumentTree<T>(asDoc, context);
    }
    return result;
};