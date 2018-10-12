import { BaseProps, ParseParams, PRIMITIVE_TYPES } from "./models";
import { execute, isComputed, removeCustomWrappers, isExpression, compute, attrIsReserved } from "./expression";

export const parse = (params: ParseParams): BaseProps => {

    const asDoc = parseFromXML(params.source);
    let result = null;
    if (asDoc) {
        result = parseFromDocumentTree(asDoc, params);
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

const parseFromDocumentTree = (source: Document, params: ParseParams): BaseProps => {
    const elements = Array.from(source.children);
    return parseElement(elements[0], params);
};

const parseElement = (elem: Element, params: ParseParams): BaseProps => {
    const ownAttributes = parseAllAttributes(elem, params);
    const children = parseChildren(elem, ownAttributes, params);

    return {
        ...ownAttributes,
        children
    } as BaseProps;
};

const parseAllAttributes = (node: Element, params: ParseParams): BaseProps => {

    let result = {
        type: parseAttribute(node, 'type', params) || node.nodeName,
        name: parseAttribute(node, 'name', params),
        template: node.innerHTML.trim(),
        value: compute(node.textContent, params),
    } as BaseProps;

    Array.from(node.attributes).forEach((attr: Attr) => {
        const attrValue = parseAttribute(node, attr.nodeName, params);
        if (!attrIsReserved(attrValue)) {
            result[attr.nodeName] = parseAttribute(node, attr.nodeName, params);
        }
    });
    return result;
};

const parseAttribute = (node: Element, name: string, params: ParseParams): any => {
    const attr = node.getAttribute(name) || '';
    if (isComputed(attr)) {
        return compute(attr, params);
    }
    if (isExpression(attr)) {
        return execute(attr, params);
    }
    return attr;
};

const parseChildren = (node: Element, elem: BaseProps, params: ParseParams): BaseProps[] => {
    let children = [];
    if (isCollection(elem.type)) {
        const items = elem.children || [];
        const itemAlias = parseAttribute(node, 'item', null);
        children = items.reduce((total: BaseProps[], item: any) => {
            const newParams = rebaseParams(elem.template, params, itemAlias, item);
            total = [...total, parse(newParams)];
            return total;
        }, []);
    } else {
        children = Array.from(node.children).reduce((total: BaseProps[], child: Element) => {
            const newParams = rebaseParams(child.outerHTML, params);
            total = [...total, parse(newParams)];
            return total;
        }, []);
    }
    return children;
};

const rebaseParams = (newTemplate: string, params: ParseParams, alias?: string, closureData?: any): ParseParams => {
    const newParams = {
        ...params,
        source: newTemplate,
        closure: params.closure || {}
    };
    if (alias && closureData) {
        newParams.closure[alias] = closureData;
    }

    return newParams;
};

const isCollection = (type: string): boolean => {
    return type === PRIMITIVE_TYPES.COLLECTION;
};