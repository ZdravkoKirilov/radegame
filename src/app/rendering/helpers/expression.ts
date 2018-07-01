import { ParseParams } from '../models';

export const execute = (asString: string, params: ParseParams): any => {
    asString = trim(asString);
    const noWrappers = removeCustomWrappers(asString);
    const closureName = getClosureName(noWrappers);
    const source = closureName ? params.closure[closureName] : params.context;
    const funcName = noWrappers.slice(0, noWrappers.indexOf('('));
    const rawFuncName = closureName || params.removePrefix ? removePrefix(funcName) : funcName;
    const func = source[rawFuncName];
    if (!func || typeof func !== 'function') {
        throw new Error('Invalid function: ' + funcName);
    }
    const args = noWrappers
        .slice(noWrappers.indexOf('(') + 1, noWrappers.indexOf(')'))
        .split(',')
        .map(elem => {
            return isComputed(elem) ? compute(elem, params) : elem.trim();
        });
    return func(...args);
};

export const compute = (asString: string, params: ParseParams): any => {
    asString = trim(asString);
    if (isComputed(asString)) {
        const noWrappers = removeCustomWrappers(asString);
        const closureName = getClosureName(noWrappers);
        const source = closureName ? params.closure[closureName] : params.context;
        const prop = params.removePrefix || closureName ? removePrefix(noWrappers) : noWrappers;
        //return isComputed(prop) ? JSON.parse(prop) : deepProp.get(source, prop, '');
        return isComputed(prop) ? JSON.parse(prop) : evaluate(prop, source);
    }
    return asString;
};

export const isComputed = (str: string): boolean => {
    str = trim(str);
    return str.startsWith('{') && str.endsWith('}');
};

export const isExpression = (str: string): boolean => {
    str = trim(str);
    return str.startsWith('(') && str.endsWith(')');
};

export const removeCustomWrappers = (str: string): string => {
    str = trim(str);
    return str.slice(1, -1);
};

export const attrIsReserved = (value: string): boolean => {
    return typeof value === 'string' && value.startsWith('@');
};

export const evaluate = (scr: string, context: any): any => {
    return (new Function("with(this) { return " + scr + "}")).call(context);
}

const removePrefix = (str: string): string => {
    str = trim(str);
    return str.slice(str.indexOf('.') + 1);
};

const getClosureName = (str: string): string => {
    str = trim(str);
    return str.startsWith('@') ? str.slice(0, str.indexOf('.')) : null;
};

const trim = (str?: string): string => {
    return str ? str.trim() : '';
};