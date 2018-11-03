import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition } from '@app/dynamic-forms';

export const FIELD_DEF: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    return [];
};
