import { CommandAction, MutatorAction } from './GameAction.model';
import { GameState } from './Game.model';
import { GameTemplate } from './GameTemplate.model';

export type Resoler = (action: CommandAction, state: GameState, conf: GameTemplate) => MutatorAction[];