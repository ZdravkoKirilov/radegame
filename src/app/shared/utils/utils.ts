interface ObjectWithId {
    id?: number;
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
