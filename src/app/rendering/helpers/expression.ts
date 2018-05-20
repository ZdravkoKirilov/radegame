import { deepProp } from './dot-prop';

export const execute = (asString: string, context: any): any => {
    asString = removeCustomWrappers(asString);
    const funcName = asString.slice(0, asString.indexOf('('));
    const func = context[funcName];
    if (!func || typeof func !== 'function') {
        throw new Error('Invalid function');
    }
    const args = asString
        .slice(asString.indexOf('(') + 1, asString.indexOf(')'))
        .split(',')
        .map(elem => isComputed(elem) ? compute(elem, context) : elem.trim());
    return func(...args);
};

export const compute = (asString: string, context: any): any => {
    const prop = removeCustomWrappers(asString);
    return isComputed(prop) ? JSON.parse(prop) : deepProp.get(context, prop, '');
};

export const isComputed = (str: string): boolean => {
    return str.startsWith('{') && str.endsWith('}');
};

export const isExpression = (str: string): boolean => {
    return str.startsWith('(') && str.endsWith(')');
};

export const removeCustomWrappers = (str: string): string => {
    return str.slice(1, -1);
};