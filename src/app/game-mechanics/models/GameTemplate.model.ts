import {
    ResourceList, FactionList, FieldList, ActionList,
    ConditionList, StageList, RoundList, LocationEntityList,
    PathEntityList, ChoiceList
} from '../entities';

export type GameTemplate = Partial<{
    id: number;
    resources: ResourceList;
    factions: FactionList;
    actions: ActionList;
    fields: FieldList;
    conditions: ConditionList;
    rounds: RoundList;
    stages: StageList;
    locations: LocationEntityList;
    paths: PathEntityList;
    choices: ChoiceList;
}>


