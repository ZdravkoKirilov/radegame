export * from './Activity.model';
export * from './Map.model';
export * from './Quest.model';
export * from './Round.model';
export * from './Trivia.model';
export * from './Stage.model';
export * from './Resource.model';
export * from './BoardField.model';
export * from './Faction.model';

import { Activity, ActivityList } from './Activity.model';
import { MapLocation, MapPath, MapLocationList, MapPathList } from './Map.model';
import { Quest, QuestList } from './Quest.model';
import { Round, RoundList } from './Round.model';
import { Trivia, TriviaList } from './Trivia.model';
import { Stage, StageList } from './Stage.model';
import { Resource, ResourceList } from './Resource.model';
import { Field, FieldList } from './BoardField.model';
import { Faction, FactionList } from './Faction.model';

export type EntityWithKeywords = Activity & Faction & Field & Quest & Resource;

export type GameEntity = Activity | MapLocation | MapPath | Quest |
    Round | Trivia | Stage | Resource | Field | Faction;

export type GameEntityList = ActivityList | MapLocationList | MapPathList |
    QuestList | RoundList | TriviaList | StageList | ResourceList | FieldList | FactionList;