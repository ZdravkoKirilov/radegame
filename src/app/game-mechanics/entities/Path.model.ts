export interface PathEntity {
    id?: number;
    game?: number;
    stage?: number;
    fromLoc?: number;
    toLoc?: number;
}

export interface PathEntityList {
    [key: string]: PathEntity;
}