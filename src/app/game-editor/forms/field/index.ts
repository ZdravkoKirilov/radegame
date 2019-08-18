import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition, parse, BaseControl } from '@app/dynamic-forms';
import { baseTemplate, boardTemplate, stakesTemplate, composeCommonFormContext } from '../helpers';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            ${boardTemplate}

            ${stakesTemplate}

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
