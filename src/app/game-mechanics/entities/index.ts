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

import { GameAction, ActionList } from './Action.model';
import { Condition, ConditionList } from './Condition.model';
import { Round, RoundList } from './Round.model';
import { Choice, ChoiceList } from './Choice.model';
import { Stage, StageList, StageLocation, StagePath, StageLocationList, StagePathList } from './Stage.model';
import { Resource, ResourceList } from './Resource.model';
import { Field, FieldList } from './Field.model';
import { Faction, FactionList } from './Faction.model';
import { Pool, PoolList } from './Pool.model';
import { Stack, StackList } from './Stack.model';

export type EntityWithKeywords = GameAction | Faction | Field | Condition | Resource;

export type GameEntity = GameAction | StageLocation | StagePath | Condition |
    Round | Choice | Stage | Resource | Field | Faction | Pool | Stack;

export type GameEntityList = ActionList | StageLocationList | StagePathList |
    ConditionList | RoundList | ChoiceList | StageList | ResourceList | FieldList | FactionList | PoolList | StackList;