export const GameActionTypes = {
    MUTATE_STATE: '[Arena/GameAction] MUTATE_STATE',
} as const;

export class MutateState {
    readonly type = GameActionTypes.MUTATE_STATE;
    constructor (public payload: {
        path: string;
        value: any;
        broadcastTo?: number[];
    }) {}
}

export type InGameAction = MutateState;