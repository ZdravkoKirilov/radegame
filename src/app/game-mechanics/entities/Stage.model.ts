export interface Stage {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
}
export interface StageList {
    [key: string]: Stage;
}

export interface StageLocation {
    id?: number;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    field?: number;
    game?: number;
    stage?: number;
}

export interface StagePath {
    id?: number;
    game?: number;
    stage?: number;
    fromLoc?: number;
    toLoc?: number;
}

export interface StagePathList {
    [key: string]: StagePath;
}

export interface StageLocationList {
    [key: string]: StageLocation;
}
