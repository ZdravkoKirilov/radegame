import { Quest, Activity, Resource, BoardField } from '../../game-mechanics/models/index';
import { Option } from '../../dynamic-forms/models/Base.model';
import { ConnectedEntities } from '../../dynamic-forms/models/ConnectedEntities';

export function composeQuestOptions(ent: ConnectedEntities): Option[] {
    return ent.quests.map((elem: Quest): Option => ({
        label: elem.name,
        value: elem.id
    }));
}

export function composeActivityOptions(ent: ConnectedEntities): Option[] {
    return ent.activities.map((elem: Activity): Option => ({
        label: elem.name,
        value: elem.id
    }));
}

export function composeResourceOptions(ent: ConnectedEntities): Option[] {
    return ent.resources.map((elem: Resource): Option => ({
        label: elem.name,
        value: elem.id
    }));
}

export function composeFieldOptions(ent: ConnectedEntities): Option[] {
    return ent.fields.map((elem: BoardField): Option => ({
        label: elem.name,
        value: elem.id
    }));
}
