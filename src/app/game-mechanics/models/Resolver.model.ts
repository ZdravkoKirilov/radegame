import { CommandAction, MutatorAction } from './GameAction.model';
import { GameState } from './Game.model';

export type ResolverPayload = {
    action: CommandAction;
    state: GameState;
}

export type Resoler = (payload: ResolverPayload) => MutatorAction[];