import { deepProp } from './dot-prop';

interface ObjectWithId {
    id?: number;
    [key: string]: any;
}

interface IndexedList<T> {
    [key: string]: T;
}

export const toIndexedList = <T = ObjectWithId>(source: T[], indexProp = 'id'): IndexedList<T> => {
    return source.reduce((acc: IndexedList<T>, elem: T, index) => {
        const prop = deepProp.get(elem as any, indexProp, index);
        acc[prop] = elem;
        return acc;
    }, {});
};

export const rebaseListIndex = (source: ObjectWithId, newIndex: string): IndexedList<any> => {
    return Object.values(source).reduce((acc, item, index) => {
        const prop = deepProp.get(item, newIndex, index);
        acc[prop] = item;
        return acc;
    }, {});
}

export const asArray = <T>(obj: object): T[] => Object.values(obj);

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type WithKeys<T> = {
    readonly [P in keyof T]: P;
};

export type Dictionary<T> = {
    [key: string]: T;
}