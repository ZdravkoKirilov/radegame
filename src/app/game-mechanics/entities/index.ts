export * from './Action.model';
export * from './Map.model';
export * from './Condition.model';
export * from './Round.model';
export * from './Choice.model';
export * from './Stage.model';
export * from './Resource.model';
export * from './Field.model';
export * from './Faction.model';
export * from './EffectStack.model';
export * from './EffectGroup.model';

import { GameAction, ActionList } from './Action.model';
import { MapLocation, MapPath, MapLocationList, MapPathList } from './Map.model';
import { Condition, ConditionList } from './Condition.model';
import { Round, RoundList } from './Round.model';
import { Choice, ChoiceList } from './Choice.model';
import { Stage, StageList } from './Stage.model';
import { Resource, ResourceList } from './Resource.model';
import { Field, FieldList } from './Field.model';
import { Faction, FactionList } from './Faction.model';
import { EffectGroup, GroupList } from './EffectGroup.model';
import { EffectStack, StackList } from './EffectStack.model';

export type EntityWithKeywords = GameAction | Faction | Field | Condition | Resource;

export type GameEntity = GameAction | MapLocation | MapPath | Condition |
    Round | Choice | Stage | Resource | Field | Faction | EffectGroup | EffectStack;

export type GameEntityList = ActionList | MapLocationList | MapPathList |
    ConditionList | RoundList | ChoiceList | StageList | ResourceList | FieldList | FactionList | GroupList | StackList;