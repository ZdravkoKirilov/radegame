import { BaseProps } from "../models";
import { PRIMITIVE_TYPES } from '../config';
import { execute, isComputed, removeCustomWrappers, isExpression, compute } from "./expression";

export const parse = (source: string, context: any, parentContext: any = null, omitPrefix: boolean = false): BaseProps => {

    const parseFromXML = (source: string): Document | null => {
        const parser = new DOMParser();
        const result = parser.parseFromString(source, 'application/xml');
        if (result.querySelector('parseerror')) {
            return null;
        } else {
            return result;
        }
    };

    const parseFromDocumentTree = (source: Document, context?: any): BaseProps => {
        const elements = Array.from(source.children);
        return elements.map(elem => parseElement(elem, context))[0];
    };

    const parseChildren = (node: Element, elem: BaseProps, context?: any): BaseProps[] => {
        let children = [];
        if (isCollection(elem.type)) {
            const items = elem.children || [];
            children = items.reduce((total: BaseProps[], item: any) => {
                total = [...total, parse(elem.template, item)];
                return total;
            }, []);
        } else {
            children = Array.from(node.children).reduce((total: BaseProps[], child: Element) => {
                total = [...total, parse(child.outerHTML, context)];
                return total;
            }, []);
        }
        return children;
    };

    const parseElement = (elem: Element, context?: any, index?: number): BaseProps => {
        const ownAttributes = parseAllAttributes(elem, context);
        const children = parseChildren(elem, ownAttributes, context);

        return {
            ...ownAttributes,
            children
        } as BaseProps;
    };

    const parseAttribute = (node: Element, name: string, context?: any): any => {
        context = context || {} as BaseProps;
        const attr = node.getAttribute(name) || '';
        if (isComputed(attr)) {
            return compute(attr, context);
        }
        if (isExpression(attr)) {
            return execute(attr, context);
        }
        return attr;
    };

    const parseAllAttributes = (node: Element, context?: any): BaseProps => {
        context = context || {} as BaseProps;
        let result = {
            type: parseAttribute(node, 'type', context) || node.nodeName,
            name: parseAttribute(node, 'name', context),
            template: node.innerHTML.trim(),
        } as BaseProps;

        Array.from(node.attributes).forEach((attr: Attr) => {
            result[attr.nodeName] = parseAttribute(node, attr.nodeName, context);
        });

        validateProps(result);
        return result;
    };

    const isCollection = (type: string): boolean => {
        return type === PRIMITIVE_TYPES.COLLECTION;
    };

    const validateProps = (props: BaseProps): void => {

    };


    const asDoc = parseFromXML(source);
    let result = null;
    if (asDoc) {
        result = parseFromDocumentTree(asDoc, context);
    }
    return result;
};