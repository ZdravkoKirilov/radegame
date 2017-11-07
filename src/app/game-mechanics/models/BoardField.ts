export interface BoardField {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
}

export interface BoardFieldList {
    [key: string]: BoardField;
}

export interface Grid {
    matrix?: any[][];
}

export interface MapFieldSettings {
    id?: number;
    width: number;
    height: number;
    top: number;
    left: number;
    fieldId: number;
}

export interface MapPath {
    id?: number;
    from?: number;
    to?: number;
    bidirectional?: boolean;
    image?: string;
    name?: string;
}
