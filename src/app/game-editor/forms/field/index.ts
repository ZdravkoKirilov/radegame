import { Field, GameEntity } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition, parse, BaseControl } from '@app/dynamic-forms';
import { baseTemplate, costTemplate, riskTemplate, boardTemplate, stakesTemplate, composeCommonFormContext } from '../helpers';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            ${boardTemplate}

            ${costTemplate}

            ${riskTemplate}

            ${stakesTemplate}

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
};
