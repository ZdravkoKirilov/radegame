export type PlayerActionPayload = {
    player: number; // Player
    data: any;
}

export type CommandAction = {
    type: string;
    payload: PlayerActionPayload;
}

export type MutatorAction = {
    type: string;
    payload: PlayerActionPayload;
}

export type PlayerAction = CommandAction | MutatorAction;