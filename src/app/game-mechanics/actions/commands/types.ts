export const COMMAND_TYPES = {
    PASS_TURN: 'PASS_TURN',
    PLAY_ACTION: 'PLAY_ACTION',
}

export type CommandType = keyof typeof COMMAND_TYPES;