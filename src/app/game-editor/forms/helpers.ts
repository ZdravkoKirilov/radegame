import keys from 'lodash/keys';

import {
    Condition, GameAction, Resource, Field, Round,
    Stage, EntityWithKeywords, Choice, Faction, GameEntity
} from '@app/game-mechanics';
import { Option, ConnectedEntities, ToggleContext, BaseControl, controlTypes } from '@app/dynamic-forms';

export function composeConditionOptions(ent: ConnectedEntities): Option[] {
    return ent.conditions.map((elem: Condition): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeActionOptions(ent: ConnectedEntities): Option[] {
    return ent.actions.map((elem: GameAction): Option => ({
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
    return ent.stages.map((elem: Stage): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeChoiceOptions(ent: ConnectedEntities): Option[] {
    return ent.choices.map((elem: Choice): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeFactionOptions(ent: ConnectedEntities): Option[] {
    return ent.factions.map((elem: Faction): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeBooleanOptions(positive = 'Yes', negative = 'No'): Option[] {
    return [
        {
            label: positive,
            value: true
        }, {
            label: negative,
            value: false
        }
    ]
}

export function composeFromObject(obj: object): Option[] {
    return Object.keys(obj).map(key => ({ value: key, label: obj[key] }));
}

export function composeKeywordOptions(entities: Array<EntityWithKeywords>[] = []): Option[] {
    const result = new Set();

    entities.forEach((group: EntityWithKeywords[]) => {

        group.forEach(elem => {
            if (elem.keywords) {
                const keywords = elem.keywords.split(';');
                keywords.forEach((keyword: string) => {
                    result.add({
                        label: keyword,
                        value: keyword
                    });
                });
            }
        });

    });

    return Array.from(result);
}

export function combineContexts(base: ToggleContext, contexts: ToggleContext[] = []): ToggleContext {
    const newContext = { ...base, show: { ...base.show } };

    contexts.forEach(ctx => {
        newContext.show.equals = [...newContext.show.equals, ...ctx.show.equals];
    });
    return newContext;
}

export const composeEntityItem = (item: GameEntity, template: BaseControl): BaseControl => {
    return {
        type: controlTypes.FORM,
        children: template.children.map(elem => ({ ...elem, value: item[elem.name] }))
    };
};

export const getKeys = <T>(entity: GameEntity): WithKeys<T> => {
    return keys(entity).reduce(
        (acc, key) => {
            acc[key] = key;
            return acc;
        },
        {}
    );
};

type WithKeys<T> = {
    readonly [P in keyof T]: P;
};