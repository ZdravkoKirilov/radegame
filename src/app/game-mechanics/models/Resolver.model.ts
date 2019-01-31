import { CommandAction, MutatorAction } from './GameAction.model';
import { GameState } from './Game.model';
import { GameTemplate } from './GameTemplate.model';

export type ResolverPayload = {
    action: CommandAction;
    state: GameState;
    conf: GameTemplate;
}

export type Resoler = (payload: ResolverPayload) => MutatorAction[];