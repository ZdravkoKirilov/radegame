export interface ValidMoveTargetParams {
    currentPosition: number;
    allPositions: object;
    boardWidth: number;
}

export interface ValidMoveTarget {
    from: number;
    options: number[];
}

export type FindValidMoveTargets = (params: ValidMoveTargetParams) => ValidMoveTarget;

export interface Movement {
    findValidMoveTargets?: FindValidMoveTargets;
    displayName?: string;
    description?: string;
    id?: string;
}

export interface MovementsList {
    [key: string]: Movement;
}
