export interface GameMap {
    id?: number;
    image?: any;
    game?: number;
}

export interface MapLocation {
    id?: number;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    field?: number;
    game?: number;
    stage?: number;
}

export interface MapPath {
    id?: number;
    game?: number;
    stage?: number;
    fromLoc?: number;
    toLoc?: number;
}

export interface MapPathList {
    [key: string]: MapPath;
}

export interface MapLocationList {
    [key: string]: MapLocation;
}
