import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition } from '@app/dynamic-forms';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    return [];
};
