import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Phase } from '@app/game-mechanics';
import { baseTemplate, composeCommonFormContext, doneTemplate, displayNameTemplate } from '../helpers';

export const composePhaseForm: FormDefinition = (data: Phase, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}
            ${displayNameTemplate}
            ${doneTemplate}
        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
};

