import { ValidMoveTargetParams, ValidMoveTarget } from '../models/Movement';

export const movement = {
    findValidMoveTargets
};

function findValidMoveTargets(params: ValidMoveTargetParams): ValidMoveTarget {
    const { currentPosition, boardWidth } = params;
    const result = { options: [], from: currentPosition };
    const { options } = result;

    applyIfPossible(findLeft(currentPosition, boardWidth), options);
    applyIfPossible(findRight(currentPosition, boardWidth), options);
    applyIfPossible(findBack(currentPosition, boardWidth), options);
    applyIfPossible(findFront(currentPosition, boardWidth), options);
    applyIfPossible(findFrontLeftDiagonal(currentPosition, boardWidth), options);
    applyIfPossible(findFrontRightDiagonal(currentPosition, boardWidth), options);
    applyIfPossible(findBackLeftDiagonal(currentPosition, boardWidth), options);
    applyIfPossible(findBackRightDiagonal(currentPosition, boardWidth), options);

    return <ValidMoveTarget>result;
}

function applyIfPossible(result, target): void {
    if (result) {
        target.push(result);
    }
}

function findRight(from, width): number {
    return from % width === 0 ? -1 : from + 1;
}

function findLeft(from, width): number {
    return from % width === 1 || from === 1 ? -1 : from - 1;
}

function findBack(from, width): number {
    return from > width ? from - width : -1;
}

function findFront(from, width): number {
    return from + width;
}

function findFrontLeftDiagonal(from, width): number {
    return from % width === 1 ? -1 : from + width - 1;
}

function findFrontRightDiagonal(from, width): number {
    return from % width === 0 ? -1 : from + width + 1;
}

function findBackLeftDiagonal(from, width): number {
    return from % width === 1 || from <= width ? -1 : from - (width + 1);
}

function findBackRightDiagonal(from, width): number {
    return from % width === 1 || from <= width ? -1 : from - (width - 1);
}
