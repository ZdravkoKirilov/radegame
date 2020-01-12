import { Faction } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data
        }
    }, true) as BaseControl[];

    return result;
};