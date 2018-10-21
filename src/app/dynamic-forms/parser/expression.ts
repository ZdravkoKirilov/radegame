import { ParseParams } from './models';

export const execute = (asString: string, params: ParseParams, reservedFunc?: any): any => {
    asString = trim(asString);
    const noWrappers = removeCustomWrappers(asString);
    const closureName = getClosureName(noWrappers);
    const closure = closureName && params.closure[closureName] ? params.closure[closureName] : {};
    const source = closureName ? closure : params.context;
    const funcName = noWrappers.slice(0, noWrappers.indexOf('('));
    const rawFuncName = closureName || params.removePrefix ? removePrefix(funcName) : funcName;
    const func = source[rawFuncName] || reservedFunc;
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
        try {
            const noWrappers = removeCustomWrappers(asString);
            const closureName = getClosureName(noWrappers);
            const closure = closureName && params.closure[closureName] ? params.closure[closureName] : {};
            const source = closureName ? closure : params.context;
            const prop = params.removePrefix || closureName ? removePrefix(noWrappers) : noWrappers;
            const result = isComputed(prop) ? JSON.parse(prop) : evaluate(prop, source);
            return result;
        } catch (err) {
            debugger;
        }
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

export const evaluate = (src: string, context: any): any => {
    try {
        return (new Function("with(this) { return " + src + "}")).call(context) || '';
    } catch (err) {
        // console.group('Problem occured with expression evaluation');
        // console.log('Src: ', src);
        // console.log('Context: ', context)
        // console.groupEnd();
        return '';
    }
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