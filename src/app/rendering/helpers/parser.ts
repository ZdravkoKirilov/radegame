import { BaseElement } from "../models";
import { PRIMITIVE_TYPES } from '../config';
import { deepProp } from './dot-prop';

export const parse = (source: string, context: any): BaseElement => {
    const asDoc = parseFromXML(source);
    let result = null;
    if (asDoc) {
        result = parseFromDocumentTree(asDoc, context);
    }
    return result;
};

const parseFromXML = (source: string): Document | null => {
    const parser = new DOMParser();
    const result = parser.parseFromString(source, 'application/xml');
    if (result.querySelector('parseerror')) {
        return null;
    } else {
        return result;
    }
};

const parseFromDocumentTree = (source: Document, context?: any): BaseElement => {
    const elements = Array.from(source.children);
    return elements.map(elem => parseElement(elem, context))[0];
};

const parseChildren = (node: Element, elem: BaseElement, context?: any): BaseElement[] => {
    let children = [];
    if (isCollection(elem.type)) {
        const items = elem.children || [];
        children = items.reduce((total: BaseElement[], item: any) => {
            total = [...total, parse(elem.template, item)];
            return total;
        }, []);
    } else {
        children = Array.from(node.children).reduce((total: BaseElement[], child: Element) => {
            total = [...total, parse(child.outerHTML, context)];
            return total;
        }, []);
    }
    return children;
};

const parseElement = (elem: Element, context?: any, index?: number): BaseElement => {
    const ownAttributes = parseAllAttributes(elem, context);
    const children = parseChildren(elem, ownAttributes, context);

    return {
        ...ownAttributes,
        children
    } as BaseElement;
};

const parseAttribute = (node: Element, name: string, context?: any): any => {
    context = context || {} as BaseElement;
    const attr = node.getAttribute(name) || '';
    if (isComputed(attr)) {
        const prop = removeComputedSigns(attr);
        return isComputed(prop) ? JSON.parse(prop) : deepProp.get(context, prop, '');
    }
    return attr;
};

const parseAllAttributes = (node: Element, context?: any): BaseElement => {
    context = context || {} as BaseElement;
    let result = {
        type: node.nodeName,
        name: parseAttribute(node, 'name', context),
        template: node.innerHTML.trim(),
    } as BaseElement;

    Array.from(node.attributes).forEach((attr: Attr) => {
        result[attr.nodeName] = parseAttribute(node, attr.nodeName, context);
    });

    validateProps(result);
    return result;
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

const validateProps = (props: BaseElement): void => {

};