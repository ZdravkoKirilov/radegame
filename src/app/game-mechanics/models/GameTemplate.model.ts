import {
    ResourceList, FactionList, FieldList, ActionList,
    ConditionList, StageList, RoundList, MapLocationList,
    MapPathList, ChoiceList
} from '../entities';
import { formKeys } from '@app/game-editor';

export type GameTemplate = {
    id?: number;
    resources?: ResourceList;
    factions?: FactionList;
    actions?: ActionList;
    fields?: FieldList;
    conditions?: ConditionList;
    rounds?: RoundList;
    stages?: StageList;
    locations?: MapLocationList;
    paths?: MapPathList;
    choices?: ChoiceList;
}


