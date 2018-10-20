export interface Field {
    id?: number;
    game?: number;
    stage?: number;
    name?: string;
    description?: string;
    keywords?: string;
    image?: any;
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

export interface FieldList {
    [key: string]: Field;
}

export interface FieldResource {
    id?: number;
    resource?: number;
    field?: number;
    quantity?: number;
}
