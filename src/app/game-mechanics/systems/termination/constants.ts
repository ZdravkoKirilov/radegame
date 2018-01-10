export const TERMINATION_TYPES = {
    WIN: 'WIN',
    LOSE: 'LOSE'
};
export type TerminationType = typeof TERMINATION_TYPES.WIN | typeof TERMINATION_TYPES.LOSE;