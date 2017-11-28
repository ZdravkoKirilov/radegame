export interface BoardField {
    id?: number;
    name?: string;
    description?: string;
    image?: any;
    game?: number;
    income?: FieldResourceList;
    cost?: FieldResourceList;
}

export interface BoardFieldList {
    [key: string]: BoardField;
}

export interface Grid {
    matrix?: any[][];
}

export interface FieldResource {
    id?: number;
    resource?: number;
    field?: number;
    quantity?: number;
}

export interface FieldResourceList {
    [key: string]: FieldResource;
}
