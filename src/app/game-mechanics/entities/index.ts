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

import { GameAction, ActionList } from './Action.model';
import { Condition, ConditionList } from './Condition.model';
import { Round, RoundList } from './Round.model';
import { Choice, ChoiceList } from './Choice.model';
import { Stage, StageList } from './Stage.model';
import { Resource, ResourceList } from './Resource.model';
import { Field, FieldList } from './Field.model';
import { Faction, FactionList } from './Faction.model';
import { Pool, PoolList } from './Pool.model';
import { Stack, StackList } from './Stack.model';
import { Team, TeamList } from './Team.model';
import { Token, TokenList } from './Token.model';
import { Phase, PhaseList } from './Phase.model';
import { PathEntity, PathEntityList } from './Path.model';
import { LocationEntityList, LocationEntity } from './Location.model';

export type EntityWithKeywords = GameAction | Faction | Field | Condition | Resource;

export type GameEntity = GameAction | LocationEntity | PathEntity | Condition |
    Round | Choice | Stage | Resource | Field | Faction | Pool | Stack | Token | Team | Phase;

export type GameEntityList = ActionList | LocationEntityList | PathEntityList |
    ConditionList | RoundList | ChoiceList | StageList | ResourceList | FieldList | FactionList | PoolList | StackList |
    TeamList | TokenList | PhaseList;