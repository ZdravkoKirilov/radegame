export const MutatorTypes = {
    CHANGE_TURN: '[Arena] CHANGE_TURN',
    CHANGE_ROUND: '[Arena] CHANGE_ROUND',
} as const;

export class ChangeTurn {
    readonly type = MutatorTypes.CHANGE_TURN;
    constructor(public payload: number) { }
};

export class ChangeRound {
    readonly type = MutatorTypes.CHANGE_ROUND;
    constructor(public payload: number) { }
}

export type MutatorAction = ChangeTurn | ChangeRound;