export interface PathEntity {
    id?: number;
    game?: number;
    stage?: number;
    from_loc?: number;
    to_loc?: number;
}

export interface PathEntityList {
    [key: string]: PathEntity;
}