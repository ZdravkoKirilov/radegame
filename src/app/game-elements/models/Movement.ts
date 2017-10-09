export interface ValidMoveTargetParams {
    currentPosition: number;
    allPositions: object;
    boardWidth: number;
}

export interface ValidMoveTarget {
    from: number;
    options: number[];
}

export interface FindValidMoveTargets {
    (params: ValidMoveTargetParams): ValidMoveTarget;
}

export interface Movement {
    findValidMoveTargets: FindValidMoveTargets
}
