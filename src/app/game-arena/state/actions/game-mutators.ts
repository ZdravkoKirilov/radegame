import { ActionParam } from "@app/game-mechanics";

export const MutatorTypes = {
    CHANGE_TURN: '[Arena] CHANGE_TURN',
    CHANGE_ROUND: '[Arena] CHANGE_ROUND',
    MUTATE_STATE: '[Arena] MUTATE_STATE',
} as const;

export class ChangeTurn {
    readonly type = MutatorTypes.CHANGE_TURN;
    constructor(public payload: number) { }
};

export class ChangeRound {
    readonly type = MutatorTypes.CHANGE_ROUND;
    constructor(public payload: number) { }
}

export class MutateState {
    readonly type = MutatorTypes.MUTATE_STATE;
    constructor (public payload: ActionParam[]) {}
}

export type MutatorAction = ChangeTurn | ChangeRound | MutateState;