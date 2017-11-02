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

export interface MapFieldSettings {
    id?: string|number;
    width: string|number;
    height: string|number;
    top: string|number;
    left: string|number;
    fieldId: string|number;
}
