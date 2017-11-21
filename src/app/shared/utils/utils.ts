interface ObjectWithId {
    id?: number;
}

interface IndexedList {
    [key: string]: ObjectWithId;
}

export const toIndexedList = (source: ObjectWithId[]): IndexedList => {
    return source.reduce((acc: IndexedList, elem: ObjectWithId) => {
        acc[elem.id] = elem;
        return acc;
    }, {});
};
