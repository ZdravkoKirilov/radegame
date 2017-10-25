export interface BoardField {
    id?: string|number;
    name?: string;
    description?: string;
    image?: string;
}

export interface BoardFieldList {
    [key: string]: BoardField;
}

export type Grid = any[][];
