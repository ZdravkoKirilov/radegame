export * from './Action.model';
export * from './Condition.model';
export * from './Round.model';
export * from './Choice.model';
export * from './Stage.model';
export * from './Resource.model';
export * from './Field.model';
export * from './Faction.model';
export * from './Stack.model';
export * from './Pool.model';
export * from './Team.model';
export * from './Token.model';
export * from './Phase.model';
export * from './Location.model';
export * from './Path.model';
export * from './types';

import { GameAction } from './Action.model';
import { Condition } from './Condition.model';
import { Round } from './Round.model';
import { Choice } from './Choice.model';
import { Stage } from './Stage.model';
import { Resource } from './Resource.model';
import { Field } from './Field.model';
import { Faction } from './Faction.model';
import { Pool } from './Pool.model';
import { Stack } from './Stack.model';
import { Team } from './Team.model';
import { Token } from './Token.model';
import { Phase } from './Phase.model';
import { PathEntity } from './Path.model';
import { LocationEntity } from './Location.model';
import { Dictionary } from '@app/shared';

export type GameEntity = GameAction | LocationEntity | PathEntity | Condition |
    Round | Choice | Stage | Resource | Field | Faction | Pool | Stack | Token | Team | Phase;

// export type GameEntityList = ActionList | LocationEntityList | PathEntityList |
//     ConditionList | RoundList | ChoiceList | StageList | ResourceList | FieldList | FactionList | PoolList | StackList |
//     TeamList | TokenList | PhaseList;

export type GameEntityList = Dictionary<GameEntity>;