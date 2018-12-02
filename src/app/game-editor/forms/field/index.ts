import { Field } from '@app/game-mechanics';
import { ConnectedEntities, FormDefinition, parse, BaseControl } from '@app/dynamic-forms';
import { composeEntityOptions, baseTemplate, costTemplate, riskTemplate, boardTemplate, stakesTemplate } from '../helpers';

export const composeFieldForm: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const cost = data.cost || [];
    const risk = data.risk || [];
    const done = data.done || [];
    const undone = data.undone || [];

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
            data, cost, risk, done, undone,
            stages: composeEntityOptions(ent, 'stages'),
            sources: composeEntityOptions(ent, 'sources'),
        },
    }, true);

    return result as BaseControl[];
};
