import { Quest, Activity, Resource, Field, Round, Stage, EntityWithKeywords, Trivia, Faction, GameEntity } from '@app/game-mechanics';
import { Option, ConnectedEntities, ToggleContext, BaseControl, controlTypes } from '@app/dynamic-forms';

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
    return ent.stages.map((elem: Stage): Option => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));
}

export function composeTriviaOptions(ent: ConnectedEntities): Option[] {
    return ent.trivia.map((elem: Trivia): Option => ({
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
        controlType: controlTypes.NESTED_FORM,
        childControls: template.childControls.map(elem => ({ ...elem, value: item[elem.name] }))
    };
};