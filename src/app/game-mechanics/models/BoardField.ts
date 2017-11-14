export interface BoardField {
    id?: number;
    name?: string;
    description?: string;
    image?: any;
    game?: number;
}

export interface BoardFieldList {
    [key: string]: BoardField;
}

export interface Grid {
    matrix?: any[][];
}
