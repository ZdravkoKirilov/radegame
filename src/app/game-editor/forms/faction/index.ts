import { Faction } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, boardTemplate, composeCommonFormContext } from '../helpers';

export function composeFactionForm(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const keywords = data.keywords || [];

    const template = `
    <Form>

        ${baseTemplate}

        ${boardTemplate}

    </Form>
   `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, keywords,
        }
    }, true) as BaseControl[];

    return result;
}