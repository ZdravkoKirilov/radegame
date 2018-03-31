import { Quest, Activity, Resource, Field, Round } from '../../game-mechanics';
import { Option, ConnectedEntities } from '../../dynamic-forms';

export function composeQuestOptions(ent: ConnectedEntities): Option[] {
    return ent.quests.map((elem: Quest): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeActivityOptions(ent: ConnectedEntities): Option[] {
    return ent.activities.map((elem: Activity): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeResourceOptions(ent: ConnectedEntities): Option[] {
    return ent.resources.map((elem: Resource): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeFieldOptions(ent: ConnectedEntities): Option[] {
    return ent.fields.map((elem: Field): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeRoundOptions(ent: ConnectedEntities): Option[] {
    return ent.rounds.map((elem: Round): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeStageOptions(ent: ConnectedEntities): Option[] {
    return ent.stages.map((elem: Round): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}