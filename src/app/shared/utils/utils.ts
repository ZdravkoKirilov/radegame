interface ObjectWithId {
    id?: number;
    [key: string]: any;
}

interface IndexedList {
    [key: string]: ObjectWithId;
}

export const toIndexedList = (source: ObjectWithId[], indexProp = 'id'): IndexedList => {
    return source.reduce((acc: IndexedList, elem: ObjectWithId) => {
        const prop = elem[indexProp];
        acc[prop] = elem;
        return acc;
    }, {});
};

export const rebaseListIndex = (source: ObjectWithId, newIndex: string): IndexedList => {
    return Object.values(source).reduce((acc, item) => {
        acc[item[newIndex]] = item;
        return acc;
    }, {});
}

export const isMapLocation = (entity: any) => {
    return ('left' in entity && 'top' in entity);
}