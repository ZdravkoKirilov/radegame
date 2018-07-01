import { deepProp } from './dot-prop';

interface ObjectWithId {
    id?: number;
    [key: string]: any;
}

interface IndexedList {
    [key: string]: ObjectWithId;
}

export const toIndexedList = (source: ObjectWithId[], indexProp = 'id'): IndexedList => {
    return source.reduce((acc: IndexedList, elem: ObjectWithId) => {
        const prop = deepProp.get(elem, indexProp, 'id');
        acc[prop] = elem;
        return acc;
    }, {});
};

export const rebaseListIndex = (source: ObjectWithId, newIndex: string): IndexedList => {
    return Object.values(source).reduce((acc, item) => {
        const prop = deepProp.get(item, newIndex, 'id');
        acc[prop] = item;
        return acc;
    }, {});
}

export const asArray = <T>(obj: object): T[] => Object.values(obj);