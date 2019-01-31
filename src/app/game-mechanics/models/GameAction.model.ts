import { CommandType } from "../actions/commands";

export type PlayerActionPayload = {
    player: number; // Player
    data: any;
}

export type CommandAction = {
    type: CommandType;
    payload: PlayerActionPayload;
}

export type MutatorAction = {
    type: string;
    payload: PlayerActionPayload;
}

export type PlayerAction = CommandAction | MutatorAction;