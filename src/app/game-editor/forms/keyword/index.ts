import { Keyword } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, displayNameTemplate } from '../helpers';

export function composeKeywordForm(data: Keyword, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}

        ${displayNameTemplate}
    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
}