interface ObjectWithId {
    id?: number;
}

interface IndexedList {
    [key: string]: ObjectWithId;
}

export const toIndexedList = (source: ObjectWithId[], indexProp?: string): IndexedList => {
    return source.reduce((acc: IndexedList, elem: ObjectWithId) => {
        const prop = elem[indexProp] || elem.id;
        acc[prop] = elem;
        return acc;
    }, {});
};
