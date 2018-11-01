export interface LocationEntity {
    id?: number;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    field?: number;
    game?: number;
    stage?: number;
}

export interface LocationEntityList {
    [key: string]: LocationEntity;
}