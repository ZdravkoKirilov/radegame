import { BaseProps } from "../models";
import { PRIMITIVE_TYPES } from '../config';

export const parseFromXML = (source: string): Document | null => {
    const parser = new DOMParser();
    const result = parser.parseFromString(source, 'application/xml');
    if (result.querySelector('parseerror')) {
        return null;
    } else {
        return result;
    }
};

export const parseFromDocumentTree = (source: Document, context?: BaseProps): BaseProps[] => {
    const elements = Array.from(source.children);
    return elements.map(elem => parseElement(elem, context));
};

export const parseElement = (elem: Element, context?: BaseProps, index?: number): BaseProps => {
    const name = parseAttribute(elem, 'name', context) || index; // in order to work with arrays
    const ownAttributes = parseAllAttributes(elem, context);
    const children = ownAttributes.children || Array.from(elem.children).map((child, index) => {
        context.children = context.children || [];
        const childName = parseAttribute(child, 'name');
        const childContext = getChildContext(childName, context.children) || {} as BaseProps;
        return parseElement(child, childContext as BaseProps, index);
    });

    return {
        ...ownAttributes,
        children
    } as BaseProps;
};

export const parse = (source: string, context: BaseProps): BaseProps[] => {
    const asDoc = parseFromXML(source);
    let result = [];
    if (asDoc) {
        result = parseFromDocumentTree(asDoc, context);
    }
    return result;
};

export const parseAttribute = (node: Element, name: string, context?: BaseProps): any => {
    context = context || {} as BaseProps;
    const attr = node.getAttribute(name) || '';
    if (isComputed(attr)) {
        const prop = removeComputedSigns(attr);
        return isComputed(prop) ? JSON.parse(prop) : context[prop];
    }
    return attr;
};

export const parseAllAttributes = (node: Element, context?: BaseProps): BaseProps => {
    context = context || {} as BaseProps;
    return {
        type: node.nodeName,
        name: parseAttribute(node, 'name', context),
        mapped: parseAttribute(node, 'mapped', context),
        children: parseAttribute(node, 'children', context),
        template: isCollection(node.nodeName) && node.children[0] ? parseAllAttributes(node.children[0]) : null
    };
};

const isComputed = (str: string): boolean => {
    return str.startsWith('{') && str.endsWith('}');
};

const removeComputedSigns = (str: string): string => {
    return str.slice(1, -1);
};

const isCollection = (type: string): boolean => {
    return type === PRIMITIVE_TYPES.COLLECTION;
};

const getChildContext = (name: string, children: BaseProps[]): BaseProps | {} => {
    return children.find(child => child.name === name);
};