export interface BoardField {
    id?: number;
    name?: string;
    description?: string;
    image?: any;
    game?: number;
    income?: FieldResource[];
    cost?: FieldResource[];
    quests?: number[];
    activities?: number[];
}

export interface BoardFieldList {
    [key: string]: BoardField;
}

export interface FieldResource {
    id?: number;
    resource?: number;
    field?: number;
    quantity?: number;
}
