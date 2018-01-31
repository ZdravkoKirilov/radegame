export interface BoardField {
    id?: number;
    name?: string;
    description?: string;
    image?: any;
    game?: number;
    income?: FieldResource[];
    cost?: FieldResource[];
    quests?: FieldQuest[];
    activities?: FieldActivity[];
}

export interface FieldQuest {
    id?: number;
    quest?: number;
}

export interface FieldActivity {
    id?: number;
    activity?: number;
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
