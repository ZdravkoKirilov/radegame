import { Option, ConnectedEntities, ToggleContext } from '@app/dynamic-forms';

export function composeEntityOptions(ent: ConnectedEntities, key: keyof ConnectedEntities, exclude = []): Option[] {
    const result: Option[] = ent[key as string].map(elem => ({
        label: elem.name,
        value: elem.id,
        image: elem.image
    }));

    return exclude.length > 0 ? result.filter(elem => !exclude.includes(elem.value)) : result;
}

export function composeBooleanOptions(positive = 'Yes', negative = 'No'): Option[] {
    return [{
        label: positive,
        value: true
    }, {
        label: negative,
        value: false
    }];
}

export function composeFromObject(obj: object): Option[] {
    return Object.keys(obj).map(key => ({ value: key, label: obj[key] }));
}

export function combineContexts(base: ToggleContext, contexts: ToggleContext[] = []): ToggleContext {
    const newContext = { ...base, show: { ...base.show } };

    contexts.forEach(ctx => {
        newContext.show.equals = [...newContext.show.equals, ...ctx.show.equals];
    });
    return newContext;
}